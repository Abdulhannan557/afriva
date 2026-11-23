
import hashlib
import secrets
from datetime import datetime, timedelta, timezone


def generate_verification_token() -> str:
    return secrets.token_urlsafe(32)


def hash_verification_token(token: str) -> str:
    return hashlib.sha256(
        token.encode("utf-8")
    ).hexdigest()


def get_token_expiry() -> datetime:
    return datetime.now(timezone.utc) + timedelta(minutes=30)


def is_token_expired(expiry: datetime | None) -> bool:
    if expiry is None:
        return True

    # SQLite may return a datetime without timezone information.
    if expiry.tzinfo is None:
        expiry = expiry.replace(tzinfo=timezone.utc)

    return datetime.now(timezone.utc) >= expiry
