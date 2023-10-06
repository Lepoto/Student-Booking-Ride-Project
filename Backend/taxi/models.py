from django.db import models
from accounts.models import UserAccount

class CustomDateCapture(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class TimeSlot(models.Model):
    name = models.CharField(max_length=10)

    def __str__(self):
        return self.name

class Booking(CustomDateCapture):
    student = models.ForeignKey('accounts.UserAccount', on_delete=models.CASCADE)
    # Driver is optional
    date = models.DateField()
    time_slot = models.ForeignKey(TimeSlot, on_delete=models.CASCADE)
    preferred_gate = models.CharField(max_length=20, null=True, blank=True, choices=[('Gate 1', 'Gate 1'), ('Gate 2', 'Gate 2'), ('Gate 3', 'Gate 3')])
    destination = models.CharField(max_length=100)
    destination_lat = models.FloatField()
    destination_long = models.FloatField()

    pickup = models.CharField(max_length=100)
    pickup_lat = models.FloatField()
    pickup_long = models.FloatField()

    is_arrived = models.BooleanField(default=False)
    is_on_ride = models.BooleanField(default=False)
    is_completed = models.BooleanField(default=False)
    is_cancelled = models.BooleanField(default=False)

    def __str__(self):
        return self.student.username + " " + self.destination + " " + self.pickup

    class Meta:
        ordering = ['-created_at']
