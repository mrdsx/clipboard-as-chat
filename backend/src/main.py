import uvicorn
from datetime import datetime
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import Any

from managers import WebSocketManager
from routers import chat_session_router, ws_chat_session_router

app = FastAPI()
manager = WebSocketManager()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
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
    uvicorn.run(app, host="127.0.0.1", port=3000)
