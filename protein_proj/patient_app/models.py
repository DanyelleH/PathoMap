from django.db import models

# Create your models here.
class Patient(models.Model):
    first_name = models.CharField(blank=False, max_length=100)
    last_name = models.CharField(blank=False, max_length=100)
    dob = models.DateField(blank=False)
    diseases = models.ManyToManyField("disease_app.Disease", related_name='diseases')

    def __str__(self):
        return f"Patient {self.first_name}, {self.last_name}"