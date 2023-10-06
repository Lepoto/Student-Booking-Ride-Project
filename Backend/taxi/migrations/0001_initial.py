# Generated by Django 4.2.5 on 2023-10-06 20:00

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='TimeSlot',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Booking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('date', models.DateField()),
                ('preferred_gate', models.CharField(blank=True, choices=[('Gate 1', 'Gate 1'), ('Gate 2', 'Gate 2'), ('Gate 3', 'Gate 3')], max_length=20, null=True)),
                ('destination', models.CharField(max_length=100)),
                ('destination_lat', models.FloatField()),
                ('destination_long', models.FloatField()),
                ('pickup', models.CharField(max_length=100)),
                ('pickup_lat', models.FloatField()),
                ('pickup_long', models.FloatField()),
                ('is_arrived', models.BooleanField(default=False)),
                ('is_on_ride', models.BooleanField(default=False)),
                ('is_completed', models.BooleanField(default=False)),
                ('is_cancelled', models.BooleanField(default=False)),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('time_slot', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='taxi.timeslot')),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
    ]
