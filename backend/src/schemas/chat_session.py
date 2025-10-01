from datetime import datetime
from pydantic import BaseModel
from typing import Literal, Optional

ExpiresIn = Literal["15m", "1h", "6h", "24h"]


class CreateChatSessionSchema(BaseModel):
    session_name: str
    password: Optional[str] = None
    expires_in: ExpiresIn


class PublicChatSessionSchema(BaseModel):
    id: int
    session_uuid: str
    session_name: str
    created_at: datetime
    expires_at: datetime
