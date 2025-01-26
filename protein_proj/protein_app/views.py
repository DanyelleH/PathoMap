from django.shortcuts import render
from rest_framework.views import APIView, Response
from .models import Protein
from disease_app.models import Disease
from django.core.serializers import serialize
from django.shortcuts import get_object_or_404
import json
from .services import fetch_protein_data, fetch_protein_data_by_name
from .serializer import ProteinSerializer, DiseaseSerializer
import re
# Create your views here.

class AllProteins(APIView):
    def get(self,request):
        protein = Protein.objects.order_by("name")
        serializer = ProteinSerializer(protein, many=True)
        response = [{"name": item["name"], "accession_id": item["accession_id"]} for item in serializer.data]
        return Response(response)

class OneProtein(APIView):
    def get(self,request, parameter):
        # if type(parameter) == str:
        #     protein_name = parameter.replace("_", " ")
        #     protein = Protein.objects.filter(name = protein_name).first()
        #     if not protein:
        #         protein=fetch_protein_data_by_name(protein_name)
        # else:
        #     protein = Protein.objects.filter(accession_id = parameter)
        #     if not protein:
        #             protein=fetch_protein_data(parameter)
        if re.match(r"^[A-Z][0-9A-Z]{5}$", parameter):
        # Handle as an accession ID
            protein = Protein.objects.filter(accession_id=parameter).first()
            if not protein:
                protein = fetch_protein_data(parameter)
        else:
        # Handle as a formatted protein name
            protein_name = parameter.replace("_", " ")
            protein = Protein.objects.filter(name=protein_name).first()
            if not protein:
                protein = fetch_protein_data_by_name(protein_name)
    
        serializer = ProteinSerializer(protein)

        disease_pk = serializer.data["associated_disease"]
        diseases =Disease.objects.filter(pk__in=disease_pk)
        disease_serialzer= DiseaseSerializer(diseases, many=True)
        response_date = {
            "protein": serializer.data,
            "disease": disease_serialzer.data
        }
        return Response(response_date)
    
    def delete(self,request,name):
        protein_name = name.replace("_", " ")
        protein = get_object_or_404(Protein, name=protein_name)
        protein.delete()
        return Response(f"{protein_name} was deleted")