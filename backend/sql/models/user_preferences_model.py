from sqlalchemy import Column ,  String , Integer , ForeignKey , DateTime , JSON
from db.db_connection import Base
from sqlalchemy.sql import func
class UserPreferences(Base):
    __tablename__ = "user_preferences"

    id = Column(Integer, primary_key=True, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id', ondelete="CASCADE"), nullable = False)
    travel_interests = Column(JSON, nullable=False, default=list)
    budget_preference = Column(String(30), nullable=False)
    travel_company = Column(String(20), nullable=True)
    trip_duration = Column(String, nullable=True)
    destination_preference = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True),
            server_default=func.now(),
            nullable=False)