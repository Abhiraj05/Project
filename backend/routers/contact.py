from fastapi import status, HTTPException
from fastapi import APIRouter
from schemas.contact_schema import ContactSchema
from services.email_service import create_mail, contact_body

router = APIRouter(prefix="/public",
                   tags=["Agent"])


@router.post("/contact")
async def send_feedback(contact: ContactSchema):
    try:
        email_sub = "Feedback for Your Website"
        email_body = contact_body(
            contact.user_name, contact.category, contact.feedback)
        await create_mail(email_sub, contact.user_email, email_body)

        return {"message": "feedback sent successfully !"}

    except:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="failed to send feedback email !")
