from django.shortcuts import render
from taxi.models import Booking, TimeSlot
from taxi.serializers import BookingSerializer, TimeSlotSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

class TimeSlotView(APIView):
    def get(self, request, format=None):
        queryset = TimeSlot.objects.all()
        serializer = TimeSlotSerializer(queryset, many=True)
        return Response(serializer.data)
