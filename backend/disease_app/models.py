from django.db import models


# Create your models here.
class Disease(models.Model):
    disease_name = models.CharField(unique=True, max_length=255)
    description = models.TextField(null=True, blank=True)
    patient_summary = models.TextField(default="")
    associated_proteins = models.ManyToManyField("protein_app.Protein", related_name="associated_proteins", blank=True)

    def __str__(self):
        return f"{self.disease_name}"
    
    def get_associated_proteins(self):
        return [protein.name for protein in self.associated_proteins.all()]