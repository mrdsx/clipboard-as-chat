from datetime import datetime, timedelta
from schemas import ExpiresIn

expiration_timedelta: dict[ExpiresIn, timedelta] = {
    "15m": timedelta(minutes=15),
    "1h": timedelta(hours=1),
    "6h": timedelta(hours=6),
    "24h": timedelta(hours=24),
}


def get_chat_session_creation_and_expiration_datetime(
    expires_in: ExpiresIn,
) -> tuple[datetime, datetime]:
    creation_datetime = datetime.now()
    expiration_datetime = creation_datetime + expiration_timedelta.get(
        expires_in, timedelta(seconds=0)
    )
    return creation_datetime, expiration_datetime
