from sqlalchemy import Column, Integer, ForeignKey, JSON, DateTime, String
from sqlalchemy.sql import func

from db.db_connection import Base


class PreferenceRecommendation(Base):

    __tablename__ = "preference_recommendation"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )
    preferences= Column(JSON, nullable=False)

    status = Column(
        String(20),
        nullable=False,
        default="completed"
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )