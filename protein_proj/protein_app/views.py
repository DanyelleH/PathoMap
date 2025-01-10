from django.shortcuts import render
from rest_framework.views import APIView, Response
from .models import Protein
from disease_app.models import Disease
from django.core.serializers import serialize
import json
# Create your views here.

class AllProteins(APIView):
    def get(self,request):
        protein = Protein.objects.order_by("name")
        serialized_protein = serialize("json",protein)
        json_protein = json.loads(serialized_protein)
        all_proteins_names =[]
        for protein in json_protein:
            info = {
                'name': protein["fields"].get("name")
            }
            all_proteins_names.append(info)
        return Response(all_proteins_names)

class OneProtein(APIView):
    def get(self,request, name):
        protein_name = name.replace("_", " ")
        protein = Protein.objects.filter(name = protein_name)

        serialized_protein = serialize("json", protein)
        json_protein = json.loads(serialized_protein)[0]

        disease_pk = json_protein["fields"].get("associated_disease",[])
        
        disease = serialize('json',Disease.objects.filter(pk__in=disease_pk))
        disease_info = json.loads(disease)

        formatted_information = {
            "name": json_protein["fields"]["name"],
            "function" : json_protein["fields"]["function"],
            "associated_disease": [{
                "disease_name": disease["fields"].get("disease_name"),
                "description": disease["fields"].get("description")
            } for disease in disease_info]
        }
        return Response(formatted_information)
