"""Stories router."""
from fastapi import APIRouter, Depends
from sqlmodel import Session
from app.db import get_session
from app.schemas import StoryCard
from app.services.stories import get_latest_stories

router = APIRouter(prefix="/stories", tags=["stories"])


@router.get("/latest", response_model=list[StoryCard])
def get_latest_story_cards(
    limit: int = 3,
    session: Session = Depends(get_session),
):
    """Get latest story cards."""
    stories = get_latest_stories(session, limit=limit)
    return stories

