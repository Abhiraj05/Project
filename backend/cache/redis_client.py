import os
from dotenv import load_dotenv
from redis.asyncio import Redis

load_dotenv()

REDIS_URL = os.getenv(
    "REDIS_URL",
    "redis://localhost:6379/0"
)

redis_client: Redis | None = None


async def connect_to_redis():
    global redis_client

    redis_client = Redis.from_url(
        REDIS_URL,
        decode_responses=True,
        max_connections=20
    )

    await redis_client.ping()

    print("Redis connection established")


async def close_redis_connection():
    global redis_client

    if redis_client:
        await redis_client.aclose()
        redis_client = None

        print("Redis connection closed")


def get_redis_client() -> Redis:
    if redis_client is None:
        raise RuntimeError("Redis client is not initialized")

    return redis_client