import smtplib
from sqlalchemy import text

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.database import Base, engine
from app.models.user import User
from app.routes.auth import router as auth_router

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI
app = FastAPI(
    title="Afriva API",
    description="Backend API for the Afriva platform",
    version="1.0.0"
)

# Allow frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://afriva-taupe.vercel.app",
        settings.FRONTEND_URL.rstrip("/")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Register authentication routes
app.include_router(auth_router)

@app.get("/")
def home():
    return {
        "message": "Welcome to Afriva API",
        "status": "Running"
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }
@app.get("/diagnostics")
def diagnostics():
    results = {}

    # Test database
    try:
        from app.database import engine

        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))

        results["database"] = "connected"

    except Exception as e:
        results["database"] = f"failed: {type(e).__name__}"

    # Test SMTP connection and authentication
    try:
        from app.core.config import settings

        with smtplib.SMTP(
            settings.SMTP_HOST,
            settings.SMTP_PORT,
            timeout=10
        ) as server:
            server.starttls()
            server.login(
                settings.SMTP_USER,
                settings.SMTP_PASSWORD
            )

        results["smtp"] = "authenticated"

    except Exception as e:
        results["smtp"] = f"failed: {type(e).__name__}"

    return results