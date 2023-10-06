from django.contrib.auth.signals import user_logged_in
from django.dispatch import receiver
from accounts.utils import send_otp_email
from pyotp import TOTP
import datetime, jwt, pyotp, json

@receiver(user_logged_in)
def send_otp_on_login(sender, request, user, **kwargs):
    totp = TOTP(pyotp.random_base32(), interval=300)
    generated_otp = totp.now()
    print(generated_otp)
    send_otp_email(user.name, user.email, generated_otp)
    # user.otp_secret_key = generated_otp
    # user.save()
    print("OTP sent on login")