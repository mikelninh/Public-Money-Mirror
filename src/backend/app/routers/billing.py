"""Billing webhooks router."""
from fastapi import APIRouter, Request, HTTPException
from app.services.billing import handle_stripe_webhook
import json

router = APIRouter(prefix="/billing", tags=["billing"])


@router.post("/stripe/webhook")
async def stripe_webhook(request: Request):
    """Stripe webhook handler."""
    body = await request.body()
    signature = request.headers.get("stripe-signature")
    if not signature:
        raise HTTPException(status_code=400, detail="Missing stripe-signature header")

    payload = json.loads(body.decode())
    success = handle_stripe_webhook(payload, signature)
    if not success:
        raise HTTPException(status_code=400, detail="Invalid webhook signature")

    return {"status": "ok"}

