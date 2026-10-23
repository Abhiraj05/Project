from fastapi import status, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter
from sqlalchemy import select


router = APIRouter(prefix="/agent",
                   tags=["Agent"])

@router.websocket("/chat")
async def chat_with_agent():
    print("chat with agent")