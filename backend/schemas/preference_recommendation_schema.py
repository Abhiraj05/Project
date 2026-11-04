from pydantic import BaseModel, Field


class DestinationRecommendation(BaseModel):
    destination_name: str
    country: str
    continent: str
    category: str
    starting_price: float | None
    currency: str
    description: str
    ideal_duration: str
    best_time_to_visit: str


class PreferenceRecommendationSchema(BaseModel):
    recommendations: list[DestinationRecommendation]