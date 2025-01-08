from django.db import models


# Create your models here.
class Disease(models.Model):
    disease_name = models.CharField(unique=True, max_length=255)
    description = models.TextField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.disease_name}"