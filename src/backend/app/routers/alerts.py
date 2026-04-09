"""Alerts router."""
from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from app.db import get_session
from app.models import Alert
from app.schemas import AlertCreate, AlertResponse
from app.auth import get_current_user
from app.models import User

router = APIRouter(prefix="/alerts", tags=["alerts"])


@router.get("/", response_model=list[AlertResponse])
def get_user_alerts(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    """Get user's alerts."""
    alerts = session.exec(select(Alert).where(Alert.user_id == current_user.id)).all()
    return [AlertResponse.model_validate(a) for a in alerts]


@router.post("/", response_model=AlertResponse)
def create_alert(
    alert_data: AlertCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    """Create alert."""
    alert = Alert(
        user_id=current_user.id,
        name=alert_data.name,
        filters=alert_data.filters,
    )
    session.add(alert)
    session.commit()
    session.refresh(alert)
    return AlertResponse.model_validate(alert)

