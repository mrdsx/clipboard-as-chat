from datetime import datetime
from pydantic import BaseModel


class ChatMessageSchema(BaseModel):
    id: int
    session_id: int
    text: str
    created_at: datetime
