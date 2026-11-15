from contextlib import asynccontextmanager

from fastapi import FastAPI

from cache.redis_client import connect_to_redis , close_redis_connection

@asynccontextmanager
async def lifespan(app:FastAPI):
    await connect_to_redis()  

    yield                     

    await close_redis_connection() 

