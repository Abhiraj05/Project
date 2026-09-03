from fastapi import FastAPI,status


app=FastAPI()


@app.get("/")
def test():
   return {"message":"server is running...."}
