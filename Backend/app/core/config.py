
import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    APP_NAME = "Afriva API"
    DATABASE_URL = os.getenv(
        "DATABASE_URL",
        "sqlite:///./afriva.db"
    )

    SMTP_HOST = os.getenv("SMTP_HOST", "")
    SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
    SMTP_USER = os.getenv("SMTP_USER", "")
    SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
    EMAIL_FROM = os.getenv("EMAIL_FROM", "")


settings = Settings()
