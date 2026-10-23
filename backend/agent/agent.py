from dotenv import load_dotenv
from langchain_mcp_adapters.client import MultiServerMCPClient


load_dotenv()


client = MultiServerMCPClient({
    "travel": {
        "transport": "stdio",
        "command": "python3",
        "args": ["mcp/server.py"]
    }}
)
