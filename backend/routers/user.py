from fastapi import status, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter
from sqlalchemy import select
from db.db_connection import create_db_connection
from auth.jwt_token import get_current_user
from schemas.user_profile_schema import UserProfileFetch
from sql.models.user_model import Users

router = APIRouter(prefix="/user",
                   tags=["User"])


# gets user profile data
@router.get("/profile")
async def get_user_profile(user: UserProfileFetch, current_user=Depends(get_current_user), db: AsyncSession = Depends(create_db_connection)):
    try:
        user_query = await db.execute(select(Users.name, Users.email, Users.gender, Users.age).where(Users.id == user.id))
        is_old_user = user_query.mappings().first()

        if is_old_user is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="profile not found !")
        else:
            return {"message": "profile data fetched successfully !", "user_profile_data": is_old_user}

    except:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="failed to fetch profile data !")


# updates user account details
@router.put("/update-profile")
async def update_user_profile(user: UserProfileFetch, current_user=Depends(get_current_user), db: AsyncSession = Depends(create_db_connection)):
    try:
        user_query = await db.execute(select(Users).where(Users.id == current_user.id))
        is_old_user = user_query.mappings().first()

        if is_old_user is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="profile not found !")
        else:
            old_user_data = is_old_user["User"]
            old_user_data.name = user.name
            old_user_data.email = user.email
            old_user_data.gender = user.gender
            old_user_data.age = user.age

            await db.commit()
            await db.refresh(old_user_data)
            return {"message": "profile updated successfully !"}
    except:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="failed to updated profile !")
