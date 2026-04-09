"""Authentication and authorization."""
from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlmodel import Session, select
from app.db import get_session
from app.models import User, UserRole
from app.utils.security import verify_password, decode_access_token
from app.utils.errors import UnauthorizedError, ForbiddenError

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_current_user(
    token: str = Depends(oauth2_scheme),
    session: Session = Depends(get_session),
) -> User:
    """Get current authenticated user."""
    payload = decode_access_token(token)
    if payload is None:
        raise UnauthorizedError("Invalid authentication credentials")
    email: str = payload.get("sub")
    if email is None:
        raise UnauthorizedError("Invalid authentication credentials")
    user = session.exec(select(User).where(User.email == email)).first()
    if user is None:
        raise UnauthorizedError("User not found")
    return user


def require_role(*allowed_roles: UserRole):
    """Dependency to require specific role(s)."""

    def role_checker(current_user: User = Depends(get_current_user)) -> User:
        if current_user.role not in allowed_roles:
            raise ForbiddenError(f"Required role: {', '.join(r.value for r in allowed_roles)}")
        return current_user

    return role_checker

