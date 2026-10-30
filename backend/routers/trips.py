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


router = APIRouter(prefix="/trip",
                   tags=["Trip"])


@router.get("/history")
async def get_trip_history(current_user=Depends(get_current_user),db: AsyncSession = Depends(create_db_connection)):
    print("get trip history")


@router.post("/custom-trip-plan")
async def custom_trip_plan(current_user=Depends(get_current_user),db: AsyncSession = Depends(create_db_connection)):
    print("custom trip plan")


@router.get("/suggested-trips")
async def suggested_trips(current_user=Depends(get_current_user),db: AsyncSession = Depends(create_db_connection)):
    print("suggested trips")
