from django.shortcuts import render
# Create your views here.
from rest_framework.generics import CreateAPIView # when you ONLY need to post
from rest_framework.views import APIView, Response

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

class UserById(APIView):
    def get(self,request,username):
        user=User.objects.get(username=username)
        serialize_user = UserSerializer(user)
        return Response(serialize_user.data)

    def patch(self,request,username):
        #update Users record  PII
        user=User.objects.get(username=username)
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CurrentDisease(APIView):
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

        disease_name = request.data.get("current_readings")
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
        
        disease_name = request.data.get("current_readings")
        disease = Disease.objects.get(disease_name=disease_name)
        user.current_readings.remove(disease)
        return Response(f"{disease.disease_name} has been removed from {user.first_name}'s readings.")