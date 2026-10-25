from pydantic import BaseModel, Field ,ConfigDict
from datetime import date
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
    destination : str = Field(description="name of the destination", min_length=2 , max_length=100)
    departure_date :  date
    return_date : date
    total_budget : int = Field(ge=10000, description="total budget of user")
    travelers : int = Field(gt=0, le=20, description="no of travelers")
    travel_interests : list[TravelInterest] = Field(
        default_factory=list
    )


@model_validator(mode="after")
def validate_dates(self):
    if self.return_date < self.departure_date:
        raise ValueError(
            "Return date cannot be before departure date"
        )
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


