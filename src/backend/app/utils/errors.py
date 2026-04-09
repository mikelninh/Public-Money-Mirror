"""Error handlers."""
from fastapi import HTTPException

# Custom exceptions


class PMMException(HTTPException):
    """Base exception for Public Money Mirror."""

    pass


class NotFoundError(PMMException):
    """Resource not found."""

    def __init__(self, resource: str, identifier: str):
        super().__init__(status_code=404, detail=f"{resource} {identifier} not found")


class UnauthorizedError(PMMException):
    """Unauthorized access."""

    def __init__(self, detail: str = "Unauthorized"):
        super().__init__(status_code=401, detail=detail)


class ForbiddenError(PMMException):
    """Forbidden access."""

    def __init__(self, detail: str = "Forbidden"):
        super().__init__(status_code=403, detail=detail)

