from typing import Literal, Optional
from pydantic import BaseModel

ExpiresIn = Literal["15m", "1h", "6h", "24h"]


class CreateChatSessionSchema(BaseModel):
    session_name: str
    password: Optional[str] = None
    expires_in: ExpiresIn
