
import smtplib
from email.message import EmailMessage

from app.core.config import settings


def send_verification_email(
    recipient_email: str,
    token: str
) -> None:

    if not settings.SMTP_USER or not settings.SMTP_PASSWORD:
        raise RuntimeError("SMTP credentials are not configured.")

    verification_link = (
        f"{settings.FRONTEND_URL.rstrip('/')}"
        f"/verify-email?token={token}"
    )

    message = EmailMessage()
    message["Subject"] = "Verify your Afriva account"
    message["From"] = settings.EMAIL_FROM or settings.SMTP_USER
    message["To"] = recipient_email

    message.set_content(
        f"""
Welcome to Afriva!

Please verify your email address using this link:

{verification_link}

If you did not create an Afriva account, ignore this email.
"""
    )

    with smtplib.SMTP(
        settings.SMTP_HOST,
        settings.SMTP_PORT
    ) as server:
        server.starttls()
        server.login(
            settings.SMTP_USER,
            settings.SMTP_PASSWORD
        )
        server.send_message(message)
