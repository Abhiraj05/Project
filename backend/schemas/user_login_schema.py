from pydantic import BaseModel, Field

# user login schema
class UserLoginSchema(BaseModel):
    email: str = Field(description="user email id")
    password: str = Field(min_length=8, max_length=128, description="user password")
