from fastapi import status, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter
from sqlalchemy import select
from sql.models.user_profile_model import UserProfile

router = APIRouter(prefix="/user",
                   tags=["User"])


@router.get("/profile")
async def get_user_profile():
    print("get user profile")


@router.put("/update-profile")
async def update_user_profile():
    print("update user profile")


