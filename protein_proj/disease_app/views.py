from django.shortcuts import render
from rest_framework.views import APIView, Response
from .models import Disease
from django.core.serializers import serialize
import json
# Create your views here.
class AllDiseases(APIView):
    def get(self, response):
        diseases = Disease.objects.all()
        diseases_serialized = serialize('json', diseases)
        json_diseases = json.loads(diseases_serialized)
        
        return Response(json_diseases)