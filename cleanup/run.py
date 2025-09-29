import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL: str = os.getenv("DATABASE_URL", "")


def cleanup():
    try:
        connection = psycopg2.connect(os.getenv("DATABASE_URL"))
        cursor = connection.cursor()

        cursor.execute("DELETE FROM chat_sessions WHERE expires_at < now()")
        connection.commit()

        cursor.close()
        connection.close()

        print("Successfully cleaned up database")

    except Exception as e:
        print("Error connecting to database:", e)


if __name__ == "__main__":
    cleanup()
