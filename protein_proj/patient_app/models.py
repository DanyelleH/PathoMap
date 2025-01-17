from django.db import models
from disease_app.models import Disease
# Create your models here.
class Patient(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    dob = models.DateField()
    history = models.ManyToManyField(Disease, related_name='patient_history', blank=True)
    current_disease = models.ManyToManyField(Disease,related_name= 'current_patients', blank=True)

    def __str__(self):
        return f"Patient {self.first_name}, {self.last_name}"