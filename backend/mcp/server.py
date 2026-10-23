from mcp.server.fastmcp import FastMCP
from tools.flights_tool import get_flights
from tools.hotels_tool import get_hotels
from tools.destinations_tool import get_destinations
from tools.restaurants_tool import get_restaurants
from tools.weather_tool import get_weather

mcp = FastMCP("Mcp Server")

mcp.tool(get_destinations)
mcp.tool(get_flights)
mcp.tool(get_hotels)
mcp.tool(get_restaurants)
mcp.tool(get_weather)

if __name__ == "__main__":
    mcp.run(transport="stdio")
