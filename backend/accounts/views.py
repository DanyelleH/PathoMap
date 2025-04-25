from django.shortcuts import render
# Create your views here.
from rest_framework.generics import CreateAPIView # when you ONLY need to post
from rest_framework.views import APIView, Response
from django.http import JsonResponse

from django.contrib.auth import get_user_model
User = get_user_model()

from .serializers import SignupSerializer, UserSerializer
from rest_framework import status
from disease_app.models import Disease
from disease_app.serializer import DiseaseSerializer
from rest_framework.permissions import AllowAny


class SignupView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = SignupSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        if serializer.is_valid():
            username = serializer.validated_data["username"]
            password = serializer.validated_data["password"]
            User.objects.create_user(username=username, password=password)

class AllUsers(APIView):
    def get(self, request):
        users = User.objects.order_by("pk")
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    
    def post(self, request,):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            new_user = serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

class UserById(APIView): # by username
    def get(self,request,username):
        user=User.objects.get(username=username)
        serialize_user = UserSerializer(user)
        return Response(serialize_user.data)

    def patch(self,request,username):
        #update Users record
        user=User.objects.get(username=username)
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class SavedReadings(APIView):
    def get(self, request, username):
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)
        
        serializer = DiseaseSerializer(user.current_readings.all(), many=True)
        return Response(serializer.data)
    

    def patch(self, request, username):
        # should diseases associated with this user.
        user = User.objects.get(username=username)

        disease_name = request.data.get("disease_name") # obtain disease name from request,
        if not disease_name:
            return Response({"error":"Disease name is required"}, status=404)

        disease = Disease.objects.get(disease_name=disease_name)
        if not disease:
            return Response(f"Disease not found in database")
        user.current_readings.add(disease)
        user.save()
        
        return Response(f"{disease_name} has successfully been added to {user.first_name}'s readings")

    def delete(self, request, username):
        user = User.objects.get(username=username)
        
        disease_name = request.data.get("current_readings") # *** change to get("disease_name")
        disease = Disease.objects.get(disease_name=disease_name) # get disease object from list
        user.current_readings.remove(disease) # remove reading from users list
        return Response(f"{disease.disease_name} has been removed from {user.first_name}'s readings.")

class SavedSymptoms(APIView):
    def get(self, request, username):
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)
        
        # If it's a queryset or model objects, convert them to dicts
        data = [symptom for symptom in user.saved_symptoms]
        return Response(data)
    
    def patch(self, request, username):
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)

        symptom_analysis = request.data.get("symptom_analysis")
        
        if not symptom_analysis:
            return Response({"error": "No analysis provided"}, status=400)
        
        # Ensure saved_symptoms is a list before appending
        if not isinstance(user.saved_symptoms, list):
            user.saved_symptoms = []
        
        user.saved_symptoms.append(symptom_analysis)  # Add new analysis
        
        user.save()  # Save the changes to the database
        
        return Response({"message": f"Symptom analysis has been saved to {user.first_name}'s recent symptom search."}, status=200)
    
    def delete(self, request, username):
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)

        summary_to_delete = request.data.get("summary")
        
        if not summary_to_delete:
            return Response({"error": "No summary provided"}, status=400)

        if not isinstance(user.saved_symptoms, list):
            return Response({"error": "Saved symptoms is not a valid list"}, status=400)

        # Filter out the matching entry
        new_symptoms = [entry for entry in user.saved_symptoms if entry.get("summary") != summary_to_delete]

        # Check if anything was deleted
        if len(new_symptoms) == len(user.saved_symptoms):
            return Response({"error": "No matching analysis found"}, status=404)

        # Save the updated list
        user.saved_symptoms = new_symptoms
        user.save()

        return Response({"message": "Symptom analysis deleted successfully"}, status=200)