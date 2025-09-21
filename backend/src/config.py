import os
from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()


class Settings(BaseSettings):
    DB_USER: str = os.getenv("DB_USER", "")
    DB_PASS: str = os.getenv("DB_PASS", "")
    DB_ADDRESS: str = os.getenv("DB_ADDRESS", "")
    DB_TABLE: str = os.getenv("DB_TABLE", "")
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        f"postgresql+asyncpg://{DB_USER}:{DB_PASS}@{DB_ADDRESS}/{DB_TABLE}",
    )


settings = Settings()
