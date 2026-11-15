
from fastapi import HTTPException, status

from cache.redis_client import get_redis_client


RATE_LIMIT_SCRIPT = """
local count = redis.call("INCR", KEYS[1])
local ttl = redis.call("TTL", KEYS[1])

-- First request: start the rate-limit window.
if count == 1 then
    redis.call("EXPIRE", KEYS[1], ARGV[1])
    ttl = redis.call("TTL", KEYS[1])

-- Existing counter without an expiry: repair it.
elseif ttl == -1 then
    redis.call("EXPIRE", KEYS[1], ARGV[1])
    ttl = redis.call("TTL", KEYS[1])
end

return {count, ttl}
"""


async def enforce_rate_limit(
    identifier: str,
    limit: int = 5,
    window_seconds: int = 60,
) -> None:

    if not identifier:
        raise ValueError("Rate-limit identifier cannot be empty")

    if limit < 1 or window_seconds < 1:
        raise ValueError("Limit and window must be positive")

    redis = get_redis_client()

    key = f"rate_limit:trip_generation:{identifier}"

    count, ttl = await redis.eval(
        RATE_LIMIT_SCRIPT,
        1,
        key,
        window_seconds,
    )

    if count > limit:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many trip generation requests. Please try again later.",
            headers={
                "Retry-After": str(max(ttl, 1))
            },
        )
