from django.shortcuts import render
from rest_framework.views import APIView, Response
from .models import Patient
from django.core.serializers import serialize
import json
from .serializer import PatientSerializer
from rest_framework import status
# Create your views here.
class AllPatients(APIView):
    def post(self, request,):
        serializer = PatientSerializer(data=request.data)
        if serializer.is_valid():
            new_patient = serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

class PatientById(APIView):
    def get(self,request,id):
        patient=Patient.objects.get(id=id)
        serialize_patient = PatientSerializer(patient)
        # json_patient = json.loads(serialize_patient)
        return Response(serialize_patient.data)

    def patch(self,request,id):
        patient=Patient.objects.get(id=id)
        serializer = PatientSerializer(patient, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class Patient_History(APIView):
    def get():
        pass
    
    def put(self,request):
        #update patients history to contain diseases in remission
        pass


class Current_Diseases(APIView):
    def get():
        pass

    def put():
        #update patients record with newer concern
        pass

    def post():
        #add new record to the patients current disease record.
        pass