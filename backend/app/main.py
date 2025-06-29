from fastapi import FastAPI
from app.api import router as api_router

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Welcome to the Habit Tracker API"}

app.include_router(api_router)