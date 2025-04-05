from rest_framework.views import APIView, Response
from .models import Protein
from disease_app.models import Disease
from django.shortcuts import get_object_or_404
from .services import fetch_protein_data, fetch_protein_data_by_name, fetch_protein_data_by_disease_name
from .serializer import ProteinSerializer
from disease_app.serializer import DiseaseSerializer
from disease_app.services import fetch_disease_data
import re
# Create your views here.

class AllProteins(APIView):
    def get(self,request):
        protein = Protein.objects.order_by("name")
        serializer = ProteinSerializer(protein, many=True)
        # response = [{"name": item["name"], "accession_id": item["accession_id"]} for item in serializer.data]
        return Response(serializer.data)

class OneProtein(APIView):
    def get(self,request, parameter):
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

        disease_pk = serializer.data.get("associated_disease",[])
        diseases =Disease.objects.filter(pk__in=disease_pk)

        if diseases:
            for disease in diseases:
                if not disease.patient_summary:
                    disease.patient_summary = fetch_disease_data(disease.disease_name)
                    if not disease.patient_summary:
                        disease.patient_summary = "Patient summary not available"
                    disease.save()
            disease_serializer= DiseaseSerializer(diseases, many=True)

            for disease in disease_serializer.data:
                disease.pop('patient_summary', None)
        
            response_date = {
                "protein": serializer.data,
                "disease": disease_serializer.data
            }   
        else:
            response_date={
            "protein": serializer.data,
            "disease": "No Associated Diseases"
            }
        return Response(response_date)

    def delete(self,request,parameter):
        if re.match(r"^[A-Z][0-9A-Z]{5}$", parameter):
        # Handle as an accession ID
            protein = Protein.objects.filter(accession_id=parameter).first()
            protein.delete()
        #handle as string
        protein_name = parameter.replace("_", " ")
        protein = get_object_or_404(Protein, name=protein_name)
        protein.delete()
        return Response(f"{protein_name} was deleted")
    