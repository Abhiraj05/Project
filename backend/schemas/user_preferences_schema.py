from pydantic import BaseModel, ConfigDict, Field


class UserPreferencesCreate(BaseModel):
    travel_interests: list[str] | None = Field(default_factory=list)
    budget_preference: str = Field(max_length=30)
    travel_company: str = Field(max_length=20)
    trip_duration: str
    destination_preference: str


class UserPreferencesFetch(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    user_id: int
    travel_interests: list[str] | None
    budget_preference: str
    travel_company: str
    trip_duration: str
    destination_preference: str
