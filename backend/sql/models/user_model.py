from sqlalchemy import String, Integer, Column, ForeignKey 
from db.db_connection import Base

class Users(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, nullable=False)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False )
    password_hash = Column(String(255), nullable=False)
    