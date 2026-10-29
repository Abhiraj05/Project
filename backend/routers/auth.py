from fastapi import status, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter
from sqlalchemy import select
from db.db_connection import create_db_connection
from cache.redis_client import redis_connection
from auth.hash_password import hash_password, verify_password
from auth.jwt_token import create_token
from schemas.user_schema import UserSchema
from schemas.user_login_schema import UserLoginSchema
from schemas.reset_mail_schema import ResetMailSchema
from schemas.verify_otp_schema import VerifyOtpSchema
from schemas.set_new_password_schema import SetNewPasswordSchema
from services.otp_generation import generate_otp, otp_key
from services.email_service import create_mail, registration_successful_body, password_reset_otp_body, password_reset_successful_body
from sql.models.user_model import Users
from sql.models.user_profile_model import UserProfile

router = APIRouter(prefix="/auth",
                   tags=["Authentication"])

# redis connection
redis = redis_connection()

# checks whether new or older user & then register's user
@router.post("/signup")
async def create_user(user: UserSchema, db: AsyncSession = Depends(create_db_connection)):
    user_name = user.name
    user_email = user.email

    try:
        user_query = await db.execute(select(UserProfile).where(UserProfile.email == user_email))
        is_old_user = user_query.mappings().first()

        if is_old_user is None:
            new_user = UserProfile(name=user_name, email=user_email, phoneno=user.phoneno, gender=user.gender,
                                   password=hash_password(user.password))
            db.add(new_user)
            await db.commit()
            await db.refresh(new_user)

            email_sub = "Registration Successful"
            email_body = registration_successful_body(user_name)

            await create_mail(email_sub, user_email, email_body)

            return {"message": "registered successfully !"}

        else:
            return HTTPException(status_code=status.HTTP_409_CONFLICT, detail="user already exist !")

    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="registration failed !")


# checks credentials & login's the user
@router.post("/signin")
async def login(user: UserLoginSchema, db: AsyncSession = Depends(create_db_connection)):
    user_email = user.email

    try:
        user_query = await db.execute(select(UserProfile).where(UserProfile.email == user_email))
        is_old_user = user_query.mappings().first()
        old_user_data = is_old_user["User"]

        if is_old_user is None or not verify_password(user.password, old_user_data.password):
            return HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="invalid credentials !")

        else:
            user_name = old_user_data.name
            token = create_token({"sub": old_user_data.email})
            return {"message": "login successfully !", "access_token": token, "user_name": user_name}

    except:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="login failed !")


# sends reset password mail to user
@router.post("/reset-password")
async def reset_password(email: ResetMailSchema, db: AsyncSession = Depends(create_db_connection)):
    user_email = email.user_email

    try:
        user_query = await db.execute(select(Users).where(Users.email == user_email))
        is_old_user = user_query.scalars().first()

        if is_old_user is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="profile not found !")
        else:
            otp = generate_otp()
            redis = redis_connection()
            await redis.set(otp_key(user_email), otp, ex=60)
            user_name = is_old_user.name
            email_sub = "Reset Your Password"
            email_body = password_reset_otp_body(user_name, otp)

            await create_mail(email_sub, user_email, email_body)

            return {"message": "reset password mail sent successfully !"}

    except:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="failed to sent reset email !")


# verify otp entered by user
@router.post("/verify-otp")
async def verify_otp(data: VerifyOtpSchema):
    user_email = data.user_email

    try:
        redis = redis_connection()
        is_otp = int(await redis.get(otp_key(user_email)))

        if not is_otp:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="otp not found !")

        elif data.otp == is_otp:
            await redis.delete(otp_key(user_email))

        return {"message": "otp verified successfully !"}

    except:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="failed to verify otp !")


# update password of the user
@router.post("/update-password")
async def update_password(data: SetNewPasswordSchema, db: AsyncSession = Depends(create_db_connection)):
    user_email = data.user_email

    try:
        user_query = await db.execute(select(Users).where(Users.email == user_email))
        is_old_user = user_query.scalars().first()

        if is_old_user is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="profile not found !")
        else:
            is_old_user.password = hash_password(data.user_password)
            await db.commit()
            await db.refresh(is_old_user)

            user_email = is_old_user.email
            user_name = is_old_user.name
            email_sub = "Password Reset Successful"
            email_body = password_reset_successful_body(user_name)

            await create_mail(email_sub, user_email, email_body)

            return {"message": "password updated successfully !"}

    except:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="failed to update password !")
