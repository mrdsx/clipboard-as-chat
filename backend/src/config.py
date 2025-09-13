import os
from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()


class Settings(BaseSettings):
    DB_USER: str = os.getenv("DB_USER")  # type: ignore
    DB_PASS: str = os.getenv("DB_PASS")  # type: ignore
    DB_ADDRESS: str = os.getenv("DB_ADDRESS")  # type: ignore
    DB_TABLE: str = os.getenv("DB_TABLE")  # type: ignore
    DB_URL: str = f"postgresql+asyncpg://{DB_USER}:{DB_PASS}@{DB_ADDRESS}/{DB_TABLE}"


settings = Settings()
