from django.shortcuts import render
from rest_framework.views import APIView, Response
from .models import User
from .serializer import UserSerializer
from rest_framework import status
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
        #update Users record with newer concern, or PII
        user=User.objects.get(id=id)
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserHistory(APIView):
    def get(self, request, id):
        user = User.objects.get(id=id)
        serializer = UserSerializer(user["history"])
        return Response(serializer.data)
    
    def patch(self, request, id):
        # should pathch history when current disease is in remission
        user = User.objects.get(id=id)
        serializer = UserSerializer(user, data = request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
        return Response(f"{serializer.name} history has been updated")