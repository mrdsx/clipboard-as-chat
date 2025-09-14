from datetime import datetime
from sqlalchemy import Column
from sqlalchemy.ext.asyncio import AsyncSession

from models import ChatMessage


async def save_chat_message(
    chat_session_id: int | Column[int], text: str, session: AsyncSession
):
    new_chat_message = ChatMessage(
        session_id=chat_session_id,
        text=text,
        created_at=datetime.now(),
    )
    session.add(new_chat_message)
    await session.commit()
