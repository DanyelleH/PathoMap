from django.contrib.auth.models import AbstractUser
from django.db import models
from disease_app.models import Disease

# Create your models here.
class User(AbstractUser):

    dob = models.DateField(null=True, blank=True)
    current_readings = models.ManyToManyField(Disease,related_name= 'current_readings', blank=True) # assigned readings.

    def __str__(self):
        return f"{self.username} ({self.first_name}, {self.last_name})"
    