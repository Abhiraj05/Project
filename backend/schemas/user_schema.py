from pydantic import BaseModel, Field
from typing import Literal

# user schema
class UserSchema(BaseModel):
    name: str = Field(description="name of the user")
    email: str = Field(description="user email id")
    phoneno: int = Field(description="user phoneno")
    gender: Literal["Male", "Female"] = Field(description="user gender")
    password: str = Field(description="user password")
