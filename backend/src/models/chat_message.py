from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from database import Base


class ChatMessage(Base):
    __tablename__ = "chat_messages"
    id = Column(Integer, primary_key=True, autoincrement=True)
    session_id = Column(Integer, ForeignKey("chat_sessions.id"), nullable=False)
    text = Column(String, nullable=False)
    created_at = Column(DateTime, nullable=False)
