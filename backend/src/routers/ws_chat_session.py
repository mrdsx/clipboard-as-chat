from fastapi import (
    APIRouter,
    status,
    WebSocket,
    WebSocketDisconnect,
)
from sqlalchemy.exc import IntegrityError

from database import SessionLocal
from managers import WebSocketManager
from services import save_chat_message
from validation import validate_chat_session


router = APIRouter()
manager = WebSocketManager()


@router.websocket("/ws/chat/{session_uuid}")
async def websocket_chat_session(
    websocket: WebSocket,
    session_uuid: str,
):
    async with SessionLocal() as session:
        db_chat_session, error_message, http_code = await validate_chat_session(
            session_uuid, session
        )
        if http_code != status.HTTP_200_OK:
            await websocket.close(code=1003, reason=error_message)
            return

    await manager.connect(websocket)
    try:
        while True:
            message_text = await websocket.receive_text()

            async with SessionLocal() as session:
                db_chat_message = await save_chat_message(
                    db_chat_session.id, message_text, session
                )

            await manager.broadcast(db_chat_message)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
    except IntegrityError:
        await websocket.close(code=1008, reason="Failed to save message in database")
