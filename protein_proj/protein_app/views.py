from django.shortcuts import render
from rest_framework.views import APIView, Response
from .models import Protein
from disease_app.models import Disease
from django.core.serializers import serialize
from django.shortcuts import get_object_or_404
import json
from .services import fetch_protein_data, fetch_protein_data_by_name
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
        protein = Protein.objects.filter(name = protein_name).first()
        if not protein:
                protein=fetch_protein_data_by_name(protein_name)

            # except Exception as e:
            #     return Response({"error": f"Protein not found in database or API. {str(e)}"}, status=404)

        serialized_protein = serialize("json", [protein])
        json_protein = json.loads(serialized_protein)[0]

        disease_pk = json_protein["fields"].get("associated_disease",[])
        diseases =Disease.objects.filter(pk__in=disease_pk)
        disease_info = serialize('json',diseases)

        formatted_information = {
            "name": json_protein["fields"]["name"],
            "function" : json_protein["fields"]["function"],
            "associated_disease": [{
                "disease_name": disease["fields"].get("disease_name"),
                "description": disease["fields"].get("description")
            } for disease in json.loads(disease_info)]
        }
        return Response(formatted_information)
    
    def delete(self,request,name):
        protein_name = name.replace("_", " ")
        protein = get_object_or_404(Protein, name=protein_name)
        protein.delete()
        return Response(f"{protein_name} was deleted")