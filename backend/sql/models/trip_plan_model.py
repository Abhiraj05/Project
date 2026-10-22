from sqlalchemy import Column ,  String , Integer , ForeignKey , DateTime , JSON , Date
from db.db_connection import Base


class CustomTripPlan(Base):
    __tablename__ = "custom_trip_plan"

    id = Column(Integer, primary_key=True, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
    destination = Column(String, nullable=False)
    departure_date = Column(Date, nullable= False)
    return_date = Column(Date, nullable=False)
    total_budget = Column(Integer, nullable=False)
    travelers = Column(Integer, nullable=False)
    travel_interests = Column(JSON , nullable =True )
    created_at = Column(DateTime, nullable=False )


class SuggestedTrips(Base):
    __tablename__="suggested_trips"
    id = Column(Integer, primary_key=True , nullable=False)
    destination_name = Column(String(30) , nullable=False)
    country =  Column(String(30), nullable=False)
    continent = Column(String(30), nullable=True) 
    travel_interests = Column(String(20), nullable=True)
    ideal_duration = Column(String(15), nullable=False)
    best_visiting_time = Column(String(20), nullable=False)