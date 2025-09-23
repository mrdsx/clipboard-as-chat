import uuid
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_session
from models import ChatMessage, ChatSession
from schemas import CreateChatSessionSchema, ChatMessageSchema, PublicChatSessionSchema
from utils import get_chat_session_creation_and_expiration_datetime
from validation import validate_chat_session


router = APIRouter()


@router.get("/chat/{session_uuid}", response_model=PublicChatSessionSchema)
async def get_chat_session_by_uuid(
    session_uuid: str,
    session: AsyncSession = Depends(get_session),
):
    db_chat_session, error_message, http_code = await validate_chat_session(
        session_uuid, session
    )
    if http_code != status.HTTP_200_OK:
        raise HTTPException(status_code=http_code, detail=error_message)

    return db_chat_session


@router.get("/chat/{session_uuid}/messages", response_model=list[ChatMessageSchema])
async def get_chat_messages(
    session_uuid: str,
    session: AsyncSession = Depends(get_session),
):
    _db_chat_session, error_message, http_code = await validate_chat_session(
        session_uuid, session
    )
    if http_code != status.HTTP_200_OK:
        raise HTTPException(status_code=http_code, detail=error_message)

    results = await session.execute(
        select(ChatSession, ChatMessage)
        .join(ChatMessage, ChatSession.id == ChatMessage.session_id)
        .where(ChatSession.session_uuid == session_uuid)
        .order_by(ChatMessage.id)
    )

    return [chat_message for _chat_session, chat_message in results]


@router.post("/chat")
async def create_chat_session(
    chat_session: CreateChatSessionSchema,
    session: AsyncSession = Depends(get_session),
):
    session_uuid = str(uuid.uuid4())
    creation_time, expiration_time = get_chat_session_creation_and_expiration_datetime(
        chat_session.expires_in
    )

    new_chat_session = ChatSession(
        session_uuid=session_uuid,
        session_name=chat_session.session_name,
        password=chat_session.password,
        created_at=creation_time,
        expires_at=expiration_time,
    )
    session.add(new_chat_session)
    await session.commit()
    await session.refresh(new_chat_session)

    return {"session_uuid": session_uuid}
