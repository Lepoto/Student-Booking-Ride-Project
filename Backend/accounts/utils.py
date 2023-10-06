from django.core.mail import send_mail, EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings


def send_otp_email(name,email, otp):
    html_content = render_to_string("accounts/email_template.html", {"name": name, "email": email, "generated_otp": otp})
    text_content = strip_tags(html_content)
    subject = 'OTP Portal'
    # message = f'Hi {user.name}\nYour OTP is {otp}.\nIt will expire in 5 minutes.\n\nRegards,\nSymple-Normics Team'
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [email]
    email = EmailMultiAlternatives(subject, text_content, email_from, recipient_list)
    email.attach_alternative(html_content, "text/html")
    email.send()

    return "OTP sent successfully!"