"""Recovery kits router."""
from fastapi import APIRouter, Depends
from sqlmodel import Session
from app.db import get_session
from app.models import Case, RecoveryKit
from app.schemas import RecoveryKitCreate, RecoveryKitResponse
from app.services.recovery import generate_recovery_kit
from app.auth import get_current_user, require_role
from app.models import User, UserRole
from app.utils.errors import NotFoundError

router = APIRouter(prefix="/recovery_kits", tags=["recovery"])


@router.post("/{case_id}", response_model=RecoveryKitResponse)
def create_recovery_kit(
    case_id: int,
    kit_data: RecoveryKitCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(require_role(UserRole.GOV_CLIENT, UserRole.ANALYST, UserRole.ADMIN)),
):
    """Create recovery kit for a case."""
    case = session.get(Case, case_id)
    if not case:
        raise NotFoundError("Case", str(case_id))

    recovery_kit = generate_recovery_kit(session, case)
    return RecoveryKitResponse.model_validate(recovery_kit)

