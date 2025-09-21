import os
import uvicorn
from datetime import datetime
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import Any

from routers import chat_session_router, ws_chat_session_router

app = FastAPI()

origins = [os.getenv("ALLOWED_ORIGIN", "http://localhost:3000")]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root() -> dict[str, Any]:
    return {
        "title": "Clipboard Chat Backend",
        "status": "OK",
        "timestamp": datetime.now(),
    }


app.include_router(chat_session_router)
app.include_router(ws_chat_session_router)

if __name__ == "__main__":
    port = int(os.getenv("PORT", 3000))
    uvicorn.run(app, host=os.getenv("HOST", "0.0.0.0"), port=port)
