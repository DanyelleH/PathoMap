from django.db import models

# Create your models here.
class Protein(models.Model):
    accession_id = models.CharField(unique=True, max_length=100)
    name = models.CharField(max_length=255)
    function = models.JSONField(default=list)
    # associated_disease = models.ManyToManyField("disease_app.Disease", related_name="proteins")

    def __str__(self):
        return f" Protein Name: {self.name}"