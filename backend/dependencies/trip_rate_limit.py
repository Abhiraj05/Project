from fastapi import Depends

from auth.jwt_token import get_current_user
from middleware.rate_limiter import enforce_rate_limit 

async def trip_generation_rate_limit(current_user=Depends(get_current_user)):
    await enforce_rate_limit(identifier=str(current_user.email),
        limit=5,
        window_seconds=60,)