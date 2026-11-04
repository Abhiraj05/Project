import os
from groq import AsyncGroq
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.environ["GROQ_API_KEY"]
GROQ_MODEL = os.environ["GROQ_MODEL"]

client = AsyncGroq(
    api_key=GROQ_API_KEY,
    timeout=30.0,
    max_retries=2
)
