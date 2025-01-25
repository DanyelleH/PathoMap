from rest_framework import serializers
from .models import *
from disease_app.models import Disease

class ProteinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Protein
        fields =["accession_id", "name", "function","associated_disease"]


class DiseaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disease
        fields =["disease_name", "description"]