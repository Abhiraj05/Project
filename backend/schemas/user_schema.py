from pydantic import BaseModel, Field
from typing import Literal

# user schema
class UserSchema(BaseModel):
    name: str = Field(description="name of the user")
    email: str = Field(description="user email id")
    gender: Literal["Male", "Female"] = Field(description="user gender")
    password: str = Field(min_length=8, max_length=128, description="user password")
