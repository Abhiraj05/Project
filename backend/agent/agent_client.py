import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from tools.travel_tools import search_destinations, search_flights, get_restaurants, search_hotels, prepare_hotel_booking, create_hotel_booking

load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

tools = [
    search_destinations,
    search_flights,
    get_restaurants,
    search_hotels,
    prepare_hotel_booking,
    create_hotel_booking
]

llm = ChatGoogleGenerativeAI(model="gemini-3-flash-preview")
llm_with_tools = llm.bind_tools(tools)
