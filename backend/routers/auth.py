from fastapi import status, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter
from sqlalchemy import select
from db.db_connection import create_db_connection
from cache.redis_client import redis_connection
from services.email_service import create_mail
from auth.hash_password import hash_password, verify_password
from auth.jwt_token import create_token
from schemas.user_schema import UserSchema
from schemas.user_login_schema import UserLoginSchema
from schemas.reset_mail_schema import ResetMailSchema
from schemas.verify_otp_schema import VerifyOtpSchema
from schemas.set_new_password_schema import SetNewPasswordSchema
from services.otp_generation import generate_otp, otp_key
from sql.models.user_model import User
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
    user_phoneno = user.phoneno
    user_gender = user.gender
    user_password = user.password

    try:
        user_query = await db.execute(select(UserProfile).where(UserProfile.email == user_email))
        is_old_user = user_query.mappings().first()

        if is_old_user is None:
            new_user = UserProfile(name=user_name, email=user_email, phoneno=user_phoneno, gender=user_gender,
                                   password=hash_password(user_password))
            db.add(new_user)
            await db.commit()
            await db.refresh(new_user)

            email_sub = "Registration Successful"
            email_body = f"""
            Hello {user_name},

            Your registration has been completed successfully, and your account has been activated.

            You can now sign in and access our services.

            If you have any questions or require assistance, please don't hesitate to contact our support team.

            Thank you for choosing us.

            Best regards,
            
            Tech Team
            """
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
    user_password = user.password

    try:
        user_query = await db.execute(select(UserProfile).where(UserProfile.email == user_email))
        is_old_user = user_query.mappings().first()
        old_user_data = is_old_user["User"]

        if is_old_user is None or not verify_password(user_password, old_user_data.password):
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
        user_query = await db.execute(select(User).where(User.email == user_email))
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
            email_body = f"""
            Hello {user_name},

            We received a request to reset your password.

            Use the One-Time Password (OTP) below to reset your password:

            OTP: {otp}

            This OTP is valid for 10 minutes. If you did not request a password reset, you can safely ignore this email.
            Your account will remain secure.

            Thank you,
            
            Tech Team
            """

            await create_mail(email_sub, user_email, email_body)

            return {"message": "reset password mail sent successfully !"}

    except:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="failed to sent reset email !")


# verify otp entered by user
@router.post("/verify-otp")
async def verify_otp(data: VerifyOtpSchema):
    user_email = data.user_email
    user_entered_otp = data.otp

    try:
        redis = redis_connection()
        is_otp = int(await redis.get(otp_key(user_email)))

        if not is_otp:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="otp not found !")

        elif user_entered_otp == is_otp:
            await redis.delete(otp_key(user_email))

        return {"message": "otp verified successfully !"}

    except:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="failed to verify otp !")


# update password of the user
@router.post("/update-password")
async def update_password(data: SetNewPasswordSchema, db: AsyncSession = Depends(create_db_connection)):
    user_email = data.user_email
    user_new_password = data.user_password

    try:
        user_query = await db.execute(select(User).where(User.email == user_email))
        is_old_user = user_query.scalars().first()

        if is_old_user is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="profile not found !")
        else:
            is_old_user.password = hash_password(user_new_password)
            await db.commit()
            await db.refresh(is_old_user)

            user_email = is_old_user.email
            user_name = is_old_user.name
            email_sub = "Password Reset Successful"
            email_body = f"""
            Hello {user_name},

            Your password has been reset successfully for the account associated with email address {user_email}.

            You can now log in using your new password.

            If you did not make this change, please contact our support team immediately to secure your account.

            Thank you,
            
            Tech Team
            """

            await create_mail(email_sub, user_email, email_body)

            return {"message": "password updated successfully !"}

    except:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="failed to update password !")
