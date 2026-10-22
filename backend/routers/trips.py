from fastapi import status, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter
from sqlalchemy import select
from sql.models.trip_history_model import TripHistory
from sql.models.trip_plan_model import CustomTripPlan, SuggestedTrips


router = APIRouter(prefix="/trip",
                   tags=["Trip"])


@router.get("/history")
async def get_trip_history():
    print("get trip history")


@router.post("/custom-trip-plan")
async def custom_trip_plan():
    print("custom trip plan")


@router.get("/suggested-trips")
async def suggested_trips():
    print("suggested trips")
