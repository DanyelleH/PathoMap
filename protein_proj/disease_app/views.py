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
            diseases = Disease.objects.filter(disease_name__icontains=disease_name)
            
            
            if not diseases:
                return Response({"detail" : "Disease not found"}, status=404)
            else:
                response = []
                for disease in diseases:
                    serializer = DiseaseSerializer(disease)
                    response.append(serializer.data)
        return Response(response)
