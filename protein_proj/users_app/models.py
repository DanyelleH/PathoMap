from django.db import models
from disease_app.models import Disease
# Create your models here.
class User(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    dob = models.DateField()
    current_disease = models.ManyToManyField(Disease,related_name= 'current_patients', blank=True) # assigned readings.

    def __str__(self):
        return f"Patient {self.first_name}, {self.last_name}"