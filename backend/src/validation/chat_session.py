from datetime import datetime
from fastapi import status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from models import ChatSession


async def validate_chat_session(
    session_uuid: str, session: AsyncSession
) -> tuple[ChatSession, str | None, int]:
    error_message = None
    http_code = status.HTTP_200_OK

    result = await session.execute(
        select(ChatSession).where(ChatSession.session_uuid == session_uuid)
    )
    db_chat_session = result.scalar()

    if db_chat_session is None:
        error_message = "Chat session not found"
        http_code = status.HTTP_404_NOT_FOUND

    elif db_chat_session.expires_at < datetime.now():  # type: ignore
        error_message = "Chat session has expired"
        http_code = status.HTTP_403_FORBIDDEN

    return db_chat_session, error_message, http_code
