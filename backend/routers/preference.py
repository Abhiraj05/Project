from fastapi import APIRouter, Depends
from schemas.user_preferences_schema import UserPreferencesCreate
from sqlalchemy.ext.asyncio import AsyncSession
from db.db_connection import create_db_connection
from auth.jwt_token import get_current_user
from sql.models.user_model import Users
from services.preference_service import Preference_Recommendation_Service


router = APIRouter(
    prefix="/preferences",
    tags=["Preferences"]
)


@router.post("/")
async def create_user_preferences(preference_data: UserPreferencesCreate, db: AsyncSession = Depends(create_db_connection)):
    return await Preference_Recommendation_Service.create_user_preferences(db=db, user_id=Users.id, preference_data=preference_data)
