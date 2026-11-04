from pydantic import BaseModel, Field
from typing import Literal


category_type = Literal[
    "General feedback",
    "AI recommendations",
    "Trip planning",
    "User experience",
    "Bug report",
    "Feature request"
]


# contact schema
class ContactSchema(BaseModel):
    email: str = Field(description="email of the user")
    subject: str = Field(description="email subject")
    feedback: str = Field(description="user feedback")
    category: list[category_type] = Field(
        description="feedback category type", default="General feedback")
