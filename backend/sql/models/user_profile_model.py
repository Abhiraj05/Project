from sqlalchemy import String, Integer, Column, ForeignKey
from db.db_connection import Base


class UserProfile(Base):
    __tablename__ = "user_profile"
    
    id = Column(Integer, primary_key=True, nullable=False)
    user_id = Column(Integer, ForeignKey(
        "users.id",  ondelete="CASCADE"), nullable=False)
    travel_style = Column(String(20), nullable=False, default="adventure")
    budget_preference = Column(String(20), nullable=False, default="budget")
