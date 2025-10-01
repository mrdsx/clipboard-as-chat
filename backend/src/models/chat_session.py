from sqlalchemy import Column, DateTime, Integer, String

from database import Base


class ChatSession(Base):
    __tablename__ = "chat_sessions"
    id = Column(Integer, primary_key=True, autoincrement=True)
    session_uuid = Column(String, nullable=False)
    session_name = Column(String, nullable=False)
    password = Column(String)
    created_at = Column(DateTime, nullable=False)
    expires_at = Column(DateTime, nullable=False)
