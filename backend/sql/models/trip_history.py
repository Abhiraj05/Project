from sqlalchemy import Column ,  String , Integer , ForeignKey , DateTime 
from db.db_connection import Base

class TripHistory(Base):
    __tablename__ = "trip_history"

    id = Column(Integer , primary_key=True, nullable=False)
    trip_id = Column(Integer, ForeignKey("trip_plan.id", ondelete="CASCADE"), nullable=False )
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)

    status = Column(
        String(30),
        nullable=False,
        default="upcoming",
    )

    updated_at = Column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
        onupdate=func.now(),
    )