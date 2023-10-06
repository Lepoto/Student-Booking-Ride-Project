from .views import  RegisterView as student_register, RegisteredStudentsView,get_student_list
from django.urls import path

urlpatterns = [
    path('student/create', student_register.as_view()),
    path('student-check/', get_student_list)
]