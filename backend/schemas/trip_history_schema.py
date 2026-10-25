from pydantic import BaseModel, Field , ConfigDict
from datetime import date
from typing import Literal

class TripHistoryFetch(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    trip_id: int
    user_id: int
    status: str
