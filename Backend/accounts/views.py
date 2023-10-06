from rest_framework.permissions import *
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed

from django.contrib.auth import password_validation
from .serializers import *
from accounts.models import *
from accounts.utils import send_otp_email
from django.core.mail import send_mail
from django.conf import settings
from pyotp import TOTP
import datetime, jwt, pyotp, json
from django.utils import timezone
from django.contrib import auth
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator
from django.contrib.sessions.models import Session
from django.contrib.auth import authenticate,get_user_model, login, logout
from django.contrib.auth.signals import user_logged_in
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.http import JsonResponse

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Variables to be included in the token
        token['username'] = user.username
        token['email'] = user.email
        token['name'] = user.name
        token['surname'] = user.surname
        token['is_active'] = user.is_active
        token['is_student'] = user.is_student
        token['is_driver'] = user.is_driver

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer



User = get_user_model()

class RegisterView(APIView):
    def post(self, request, format=None):
        data = self.request.data

        # Get data from request data
        username = data['student']
        password = data['password']

        student_registered = RegisteredStudent.objects.get(student_number=username)
        if student_registered is None:
            return Response({'message': 'Student not registered!'}, status=status.HTTP_400_BAD_REQUEST)

        email = username + "@keyaka.ul.ac.za"

        try:
            # Validate the provided password
            password_validation.validate_password(password)

            # Create the user
            user = UserAccount.objects.create_student(
                username=username,
                email=email,
                name=student_registered.name,
                surname=student_registered.surname,
                password=password
            )
            user.save()

            # Generate both access and refresh tokens for the user
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)

            totp = TOTP(pyotp.random_base32(), interval=300)
            generated_otp = totp.now()
            print(generated_otp)

            send_otp_email(student_registered.name, email, generated_otp)

            return Response({
                'message': 'Account created successfully!',
                'access_token': access_token,
                'refresh_token': refresh_token
            }, status=status.HTTP_201_CREATED)
        except password_validation.ValidationError as e:
            return Response({'message': str(e)}, status=status.HTTP_400_BAD_REQUEST)


# API for Verifying OTP reveived from User's email
class VerifyOTPView(APIView):

    def post(self, request):
        data = self.request.data
        # Get OTP from request data
        otp = data['otp']
        email = data['email']

        if not otp:
            return Response({'message': 'OTP is required!'}, status=400)

        # Validate OTP using the provided secret key
        user_claim = UserAccount.objects.get(email=email)

        if otp==user_claim.otp_secret_key:
            user_claim.otp_secret_key = None
            user_claim.save()
            return Response({'message': 'OTP verified successfully!'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'OTP verification failed!'}, status=400)


class RegisteredStudentsView(APIView):
    def get(self, request, format=None):
        students = RegisteredStudent.objects.all()
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)

def get_student_list(request):
    """
    Returns Json list of all restaurants
    """
    if request.method == "GET":
        rest_list = RegisteredStudent.objects.all()
        serializer = StudentSerializer(rest_list, many=True)
        return JsonResponse(serializer.data, safe=False)