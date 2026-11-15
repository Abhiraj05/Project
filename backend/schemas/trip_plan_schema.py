from pydantic import BaseModel, Field ,ConfigDict, model_validator
from datetime import date, timedelta
from typing import Literal

TravelInterest = Literal[
    "adventure",
    "culture",
    "food",
    "relaxation",
    "nature",
    "shopping",
] 

class TripPlanCreate(BaseModel):
    destination: str = Field(description="name of the destination", min_length=2, max_length=100)
    departure_date: date
    return_date: date
    total_budget: int = Field(ge=10000, description="total budget of user")
    travelers: int = Field(gt=0, le=20, description="no of travelers")
    travel_interests: list[TravelInterest] = Field(
        default_factory=list
    )

    @model_validator(mode="after")
    def validate_dates(self):
        if self.return_date < self.departure_date:
            raise ValueError("Return date cannot be before departure date")
        if (self.return_date - self.departure_date).days >= 31:
            raise ValueError("Trip duration cannot exceed 31 calendar days")
        return self



class CustomTripItinerary(BaseModel):
    destination: str = Field(min_length=2, max_length=100)
    departure_date: date
    return_date: date
    travelers: int = Field(gt=0, le=20)
    estimated_total_cost: float = Field(ge=0)
    currency: str = Field(pattern=r"^[A-Z]{3}$")
    summary: str = Field(min_length=10, max_length=500)
    days: list[TripDay] = Field(min_length=1, max_length=31)
    practical_tips: list[str] = Field(min_length=1, max_length=8)

    @model_validator(mode="after")
    def validate_itinerary_dates(self):
        expected_day_count = (self.return_date - self.departure_date).days + 1
        if len(self.days) != expected_day_count:
            raise ValueError("Itinerary must include exactly one day for each trip date")

        for index, day in enumerate(self.days):
            expected_date = self.departure_date + timedelta(days=index)
            if day.day_number != index + 1 or day.date != expected_date:
                raise ValueError("Itinerary days must be numbered and dated consecutively")

        activity_total = sum(
            activity.estimated_cost
            for day in self.days
            for activity in day.activities
        )
        if activity_total > self.estimated_total_cost:
            raise ValueError("Activity estimates cannot exceed the estimated trip total")

        return self


class TripPlanFetch(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    destination: str
    departure_date: date
    return_date: date
    total_budget: int
    travelers: int
    travel_interests: list[str] | None


