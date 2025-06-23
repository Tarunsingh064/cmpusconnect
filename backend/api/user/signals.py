# signal.py
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
#from .models import UserPhone
#from .utils import generate_otp, send_otp

'''def send_otp_to_user_phone(user):
    try:
        user_phone = UserPhone.objects.get(user=user)
        otp = generate_otp()
        user_phone.otp = otp
        user_phone.save()

        response = send_otp(user_phone.phone_number, otp)
        return response
    except UserPhone.DoesNotExist:
        return {"type": "error", "message": "Phone number not found"}'''


@receiver(post_save, sender=User)
@receiver(post_save, sender=User)
def send_confirmation_email(sender, instance, created, **kwargs):
    print(f"Signal triggered. User: {instance.email}, Created: {created}")

    if created:
        token = default_token_generator.make_token(instance)
        uid = urlsafe_base64_encode(force_bytes(instance.pk))
        activation_link = f"http://localhost:8000/api/user/confirm-email/{uid}/{token}/"

        send_mail(
            subject='Confirm your email',
            message=f'Click the link to confirm your email: {activation_link}',
            from_email=None,
            recipient_list=[instance.email],
        )