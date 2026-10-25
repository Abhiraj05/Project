from pydantic import BaseModel, Field ,ConfigDict , EmailStr
from datetime import date
from typing import Literal

pref_travel_style = Literal["adventure", "relaxation", "luxury", "culture", "budget", "family"]

budget_preferences = Literal["budget", "mid-range", "premium", "luxury"]

class EditPersonalInfo(BaseModel): 
    name : str = Field(min_length=2 , max_length=50 , description="user name")
    email : str = EmailStr
    travel_style : list[pref_travel_style] = Field(default="adventure")
    budget_preference : list[budget_preferences] = Field(default="budget")

class UserProfileFetch(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    full_name: str
    email: EmailStr
    travel_style: list[str] 
    budget_preference: list[str] 