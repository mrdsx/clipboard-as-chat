from sqlalchemy.orm import declarative_base
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

from config import settings

engine = create_async_engine(settings.DATABASE_URL)
SessionLocal = async_sessionmaker(engine)


Base = declarative_base()


async def get_session():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    session = SessionLocal()
    try:
        yield session
    finally:
        await session.close()
