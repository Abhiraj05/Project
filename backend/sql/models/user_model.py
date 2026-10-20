from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import Relationship
from db.db_connection import Base


# user model
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    phoneno = Column(String, nullable=False)
    gender = Column(String, nullable=False)
    password = Column(String, nullable=False)

