from datetime import datetime
from fastapi import WebSocket
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from models import ChatSession


async def ws_validate_chat_session(
    session_uuid: str, websocket: WebSocket, session: AsyncSession
) -> ChatSession:
    result = await session.execute(
        select(ChatSession).where(ChatSession.session_uuid == session_uuid)
    )
    db_chat_session = result.scalar()

    if db_chat_session is None:
        await websocket.close(code=1003, reason="Chat session not found")

    if db_chat_session.expires_at < datetime.now():  # type: ignore
        await websocket.close(code=1003, reason="Chat session has expired")

    return db_chat_session
