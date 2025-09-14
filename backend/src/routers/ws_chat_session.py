from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from managers import WebSocketManager


router = APIRouter()
manager = WebSocketManager()


@router.websocket("/ws/chat/{session_id}")
async def websocket_chat_session(websocket: WebSocket, session_id: str):
    await manager.connect(websocket)
    try:
        while True:
            message = await websocket.receive_text()
            await manager.broadcast(message)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
