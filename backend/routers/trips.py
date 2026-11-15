from fastapi import status, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter
from sqlalchemy import select
from db.db_connection import create_db_connection
from auth.jwt_token import get_current_user
from schemas.trip_history_schema import TripHistoryFetch
from schemas.trip_plan_schema import TripPlanCreate,TripPlanFetch
from sql.models.trip_history_model import TripHistory
from sql.models.trip_plan_model import CustomTripPlan, SuggestedTrips
from dependencies.trip_rate_limit import trip_generation_rate_limit
from services.trip_generation_service import Trip_Generation_Service


router = APIRouter(prefix="/trip",
                   tags=["Trip"])


@router.get("/history")
async def get_trip_history(current_user=Depends(get_current_user),db: AsyncSession = Depends(create_db_connection)):
    print("get trip history")


@router.post("/custom-trip-plan", dependencies=[Depends(trip_generation_rate_limit)])
async def custom_trip_plan(trip_plan_data: TripPlanCreate, current_user=Depends(get_current_user),db: AsyncSession = Depends(create_db_connection)):
    return await Trip_Generation_Service.generate_trip(trip_plan_data = trip_plan_data , current_user = current_user , db=db)


@router.get("/suggested-trips")
async def suggested_trips(current_user=Depends(get_current_user),db: AsyncSession = Depends(create_db_connection)):
    print("suggested trips")
