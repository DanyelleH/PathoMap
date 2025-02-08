from django.shortcuts import render
from rest_framework.views import APIView, Response
from .models import User
from .serializer import UserSerializer
from rest_framework import status
from disease_app.models import Disease
from disease_app.serializer import DiseaseSerializer
# Create your views here.
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

class UserById(APIView):
    def get(self,request,id):
        user=User.objects.get(id=id)
        serialize_user = UserSerializer(user)
        return Response(serialize_user.data)

    def patch(self,request,id):
        #update Users record  PII
        user=User.objects.get(id=id)
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CurrentDisease(APIView):
    def get(self, request, id):
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)
        
        serializer = DiseaseSerializer(user.current_disease.all(), many=True)
        return Response(serializer.data)
    
    def patch(self, request, id):
        # should diseases associated with this user.
        user = User.objects.get(id=id)

        disease_name = request.data.get("current_disease")
        if not disease_name:
            return Response({"error":"Disease name is required"}, status=404)

        disease = Disease.objects.get(disease_name=disease_name)
        if not disease:
            return Response(f"Disease not found in database")
        user.current_disease.add(disease)
        user.save()
        
        return Response(f"{user.first_name}'s history has been updated")

    def delete(self, request, id):
        user = User.objects.get(id=id)
        
        disease_name = request.data.get("current_disease")
        disease = Disease.objects.get(disease_name=disease_name)
        user.current_disease.remove(disease)
        return Response(f"{disease.disease_name} has been removed from {user.first_name}")