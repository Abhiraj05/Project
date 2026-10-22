from sqlalchemy import String , Integer, Column, ForeignKey ,ImageField
class user_profile(Base):
    id = Column(Integer, primary_key=True, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id",  ondelete="CASCADE"), nullable=False)
    travel_style = Column(String(20), nullable=False , default="adventure")
    budget_preference = Column(String(20), nullable=False, default="budget")