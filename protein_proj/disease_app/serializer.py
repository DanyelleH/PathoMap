from rest_framework import serializers
from .models import *
from disease_app.models import Disease

class DiseaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disease
        fields =["pk", "disease_name", "description","patient_summary"]