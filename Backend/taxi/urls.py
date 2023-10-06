from django.urls import path
from .views import TimeSlotView

urlpatterns = [
    path('time-slots/', TimeSlotView.as_view())
]