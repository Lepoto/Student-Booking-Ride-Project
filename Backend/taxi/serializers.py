from rest_framework import serializers
from taxi.models import Booking, TimeSlot
from accounts.serializers import StudentSerializer


class TimeSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeSlot
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    student = StudentSerializer()
    time_slot = TimeSlotSerializer()
    class Meta:
        model = Booking
        fields = '__all__'
