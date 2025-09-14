from fastapi import WebSocket

from models import ChatMessage
from schemas import ChatMessageSchema


class WebSocketManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket) -> None:
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket) -> None:
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast(self, message: ChatMessage) -> None:
        for connection in self.active_connections:
            message_schema = ChatMessageSchema.model_validate(message)
            await connection.send_text(message_schema.model_dump_json())
