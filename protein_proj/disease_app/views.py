from django.shortcuts import render
from rest_framework.views import APIView, Response
from .models import Disease
from .serializer import DiseaseSerializer
from django.core.serializers import serialize
from protein_app.services import fetch_protein_data_by_disease_name
import json
# Create your views here.
class AllDiseases(APIView):
    def get(self, request):
        diseases = Disease.objects.all()
        diseases_serialized = serialize('json', diseases)
        json_diseases = json.loads(diseases_serialized)
        
        return Response(json_diseases)

class OneDisease(APIView):
    def get(self, request, pk):
        try:
            disease = Disease.objects.get(pk=pk)
        except Disease.DoesNotExist:
            return Response({"Disease with that pk was not found"}, status=404)
        
        serializer = DiseaseSerializer(disease)
        return Response(serializer.data)

class ProtienDataByDisease(APIView):
    def get(self, request, disease_name):
        try:
            disease = Disease.objects.get(disease_name=disease_name)
        except Disease.DoesNotExist:
            #get all  protein data for the disease.
            fetch_protein_data_by_disease_name(disease_name)
            disease = Disease.objects.filter(disease_name__icontains=disease_name).first()
            
            if not disease:
                return Response({"detail" : "Disease not found"}, status=404)
        serializer = DiseaseSerializer(disease)
        return Response(serializer.data)
