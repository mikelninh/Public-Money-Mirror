"""Premium subscription router."""
from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from app.db import get_session
from app.models import Subscription, User
from app.auth import get_current_user

router = APIRouter(prefix="/premium", tags=["premium"])


@router.get("/status")
def get_premium_status(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    """Get user's premium subscription status."""
    subscription = session.exec(
        select(Subscription).where(Subscription.user_id == current_user.id, Subscription.is_active == True)
    ).first()

    if subscription and subscription.plan != "free":
        return {
            "is_premium": True,
            "plan": subscription.plan,
            "expires_at": subscription.expires_at.isoformat() if subscription.expires_at else None,
        }
    return {"is_premium": False, "plan": "free"}

