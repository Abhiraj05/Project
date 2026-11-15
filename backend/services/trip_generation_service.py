from datetime import datetime
from sql.models.trip_plan_model import CustomTripPlan
from schemas.trip_plan_schema import TripPlanCreate
from sqlalchemy.ext.asyncio import AsyncSession
from services.llm_services import Generate_Trip_Service

class Trip_Generation_Service:
    async def generate_trip(trip_plan_data: TripPlanCreate, current_user, db: AsyncSession):
        db_generate_trip = CustomTripPlan(
            user_id=current_user.id,
            created_at=datetime.now(),
            **trip_plan_data.model_dump(),
        )
        try:
            db.add(db_generate_trip)
            await db.commit()
            await db.refresh(db_generate_trip)
        except Exception:
            await db.rollback()
            raise

        itinerary = await Generate_Trip_Service.generate_trip(trip_plan_data.model_dump())

        return {
            "trip": db_generate_trip,
            "itinerary": itinerary,
        }
