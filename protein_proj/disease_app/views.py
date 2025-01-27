from django.shortcuts import render
from rest_framework.views import APIView, Response
from .models import Disease
from .serializer import DiseaseSerializer
from django.core.serializers import serialize
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
            return Response({"Disease not found"}, status=404)
        
        serializer = DiseaseSerializer(disease)
        return Response(serializer.data)
        