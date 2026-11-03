import os
from dotenv import load_dotenv
from datetime import datetime
from fastmcp import Client
from langchain_core.tools import tool


load_dotenv()
MCP_URL = os.getenv("MCP_URL")


@tool
async def search_destinations(
    origin: str,
    country: str,
    budget: int,
    duration: int,
    travel_type: str,
    season: str,
    travellers: int
):
    """get famous tourist destinations based on travel preferences."""

    if not origin.strip():
        raise ValueError("Origin cannot be empty")

    if not country.strip():
        raise ValueError("Country cannot be empty")

    if budget <= 0:
        raise ValueError("Budget must be greater than zero")

    if duration <= 0:
        raise ValueError("Duration must be greater than zero")

    if travellers <= 0:
        raise ValueError("Travellers must be at least 1")

    async with Client(MCP_URL) as client:
        result = await client.call_tool(
            "search_destinations",
            {
                "origin": origin,
                "country": country,
                "budget": budget,
                "duration": duration,
                "travel_type": travel_type,
                "season": season,
                "travellers": travellers
            }
        )

        return result.content


@tool
async def search_flights(
    origin: str,
    destination: str,
    date: str,
    return_date: str = None,
    adults: int = 1,
    children: int = 0,
    infants: int = 0,
    cabin_class: str = "Economy"
):
    """get available flights and their details."""

    if not origin.strip() or not destination.strip():
        raise ValueError("Origin and destination are required")

    if origin.strip().lower() == destination.strip().lower():
        raise ValueError("Origin and destination cannot be the same")

    try:
        travel_date = datetime.strptime(date, "%Y-%m-%d").date()

        if travel_date < datetime.now().date():
            raise ValueError("Travel date cannot be in the past")

        if return_date:
            return_travel_date = datetime.strptime(
                return_date, "%Y-%m-%d"
            ).date()

            if return_travel_date <= travel_date:
                raise ValueError("Return date must be after departure date")

    except ValueError as e:
        raise ValueError(f"Invalid travel date: {e}")

    if not 1 <= adults <= 9:
        raise ValueError("Adults must be between 1 and 9")

    if not 0 <= children <= 8:
        raise ValueError("Children must be between 0 and 8")

    if not 0 <= infants <= 4 or infants > adults:
        raise ValueError("Invalid infant count")

    if adults + children > 9:
        raise ValueError("Maximum 9 adults and children combined")

    if cabin_class not in [
        "Economy", "PremiumEconomy", "Business", "First"
    ]:
        raise ValueError("Invalid cabin class")

    async with Client(MCP_URL) as client:
        result = await client.call_tool(
            "search_flights",
            {
                "origin": origin,
                "destination": destination,
                "date": date,
                "adults": adults,
                "children": children,
                "infants": infants,
                "cabin_class": cabin_class,
                **({"return_date": return_date} if return_date else {})
            }
        )

        return result.content


@tool
async def get_restaurants(
    location: str,
    cuisine: str = "Any",
    guests: int = 2
):
    """get popular restaurants and their details."""

    if not location.strip():
        raise ValueError("location cannot be empty")

    if guests <= 0:
        raise ValueError("guests must be at least 1")

    async with Client(MCP_URL) as client:
        result = await client.call_tool(
            "search_restaurants",
            {
                "location": location,
                "cuisine": cuisine,
                "guests": guests
            }
        )

        return result.content


@tool
async def search_hotels(
    city: str,
    checkin: str,
    checkout: str,
    rooms: int = 1,
    guests: int = 2
):
    """get popular hotels and their details."""

    if not city.strip():
        raise ValueError("city cannot be empty")

    try:
        checkin_date = datetime.strptime(
            checkin, "%Y-%m-%d"
        ).date()

        checkout_date = datetime.strptime(
            checkout, "%Y-%m-%d"
        ).date()

        if checkin_date < datetime.now().date():
            raise ValueError("check-in cannot be in the past")

        if checkout_date <= checkin_date:
            raise ValueError("checkout must be after check-in")

    except ValueError as e:
        raise ValueError(f"invalid hotel dates: {e}")

    if rooms <= 0:
        raise ValueError("rooms must be at least 1")

    if guests <= 0:
        raise ValueError("guests must be at least 1")

    async with Client(MCP_URL) as client:
        result = await client.call_tool(
            "search_hotels",
            {
                "city": city,
                "checkin": checkin,
                "checkout": checkout,
                "rooms": rooms,
                "guests": guests
            }
        )

        return result.content


@tool
async def prepare_hotel_booking(booking_token: str):
    """lock the selected hotel room and confirm the price.
    returns booking session ID, room details and cancellation policy."""

    async with Client(MCP_URL) as client:
        result = await client.call_tool(
            "prepare_hotel_booking",
            {
                "booking_token": booking_token
            }
        )

        return result.content


@tool
async def create_hotel_booking(
    booking_session: str,
    guests: list,
    contact_email: str,
    contact_phone: str,
    special_requests: dict,
    city: str
):
    """create a hotel booking using the prepared booking session.
    returns booking details and payment URL."""

    async with Client(MCP_URL) as client:
        arguments = {
            "booking_session": booking_session,
            "guests": guests,
            "contact_email": contact_email,
            "contact_phone": contact_phone
        }

        if special_requests is not None:
            arguments["special_requests"] = special_requests

        if city is not None:
            arguments["city"] = city

        result = await client.call_tool(
            "create_hotel_booking",
            arguments
        )

        return result.content
