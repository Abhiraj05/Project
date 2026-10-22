from fastapi import FastAPI
from routers import auth,user,trips,chat
from middleware.cors import middleware


# app initialise
app = FastAPI()
app.include_router(auth.router)
app.include_router(user.router)
app.include_router(trips.router)
app.include_router(chat.router)


# middleware
middleware(app)

# test route
@app.get("/")
def test():
    return {"message": "server is running...."}
