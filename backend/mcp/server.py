import os
import asyncio
from dotenv import load_dotenv
from fastmcp import Client

load_dotenv()
MCP_URL = os.getenv("MCP_URL")

async def main():

    async with Client(MCP_URL) as client:

        tools = await client.list_tools()

        for tool in tools:
            print(f"Tool Name: {tool.name}")
            print(f"Description: {tool.description}")
            print(f"Input Schema: {tool.inputSchema}")
            print("-" * 50)

asyncio.run(main())
