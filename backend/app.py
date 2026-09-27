from fastapi import FastAPI, status, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from middleware.cors import middleware
from db.db_connection import create_db_connection
from services.email_service import create_mail
from auth.hash_password import hash_password, verify_password
from auth.jwt_token import create_token
from sqlalchemy import select
from schemas.user_schema import UserSchema
from schemas.user_login_schema import UserLoginSchema
from sql.models.user_model import User


# app initialise
app = FastAPI()

# middleware
middleware(app)

# test route
@app.get("/")
def test():
    return {"message": "server is running...."}


# checks whether new or older user & then register's user
@app.post("/auth/signup")
async def create_user(user: UserSchema, db: AsyncSession = Depends(create_db_connection)):
    user_name = user.name
    user_email = user.email
    user_phoneno = user.phoneno
    user_gender = user.gender
    user_password = user.password

    try:
        user_query = await db.execute(select(User).where(User.email == user_email))
        is_old_user = user_query.mappings().first()

        if is_old_user is None:
            new_user = User(name=user_name, email=user_email, phoneno=user_phoneno, gender=user_gender,
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
@app.post("/auth/signin")
async def login(user: UserLoginSchema, db: AsyncSession = Depends(create_db_connection)):
    user_email = user.email
    user_password = user.password

    try:
        user_query = await db.execute(select(User).where(User.email == user_email))
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


@app.websocket("user/chat/")
async def chat_with_agent():
    print("chat with agent")
