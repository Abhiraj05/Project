from db.db_connection import create_db_connection
from sql.models.user_preferences_model import UserPreferences
from schemas.user_preferences_schema import UserPreferencesCreate
from sqlalchemy.ext.asyncio import AsyncSession
from services.llm_services import Preference_LLM_Service
from sql.models.preference_recommendation_model import PreferenceRecommendation


class Preference_Recommendation_Service:
    async def create_user_preferences(db:AsyncSession, user_id: int , preference_data:UserPreferencesCreate):
        db_preference = UserPreferences(user_id = user_id, **preference_data.model_dump())
        try:
            db.add(db_preference)
            await db.commit()
            await db.refresh(db_preference)

        except Exception:
            await db.rollback()
            raise

        recommendations = await Preference_LLM_Service.generate_preference_recommendations(preferences= preference_data.model_dump())
        db_recommendations = PreferenceRecommendation(user_id = user_id, preferences = recommendations , status = "completed")

        try:
                    db.add(db_recommendations)
                    await db.commit()
                    await db.refresh(db_recommendations)
        
        except Exception:
            await db.rollback()
            raise

        return recommendations