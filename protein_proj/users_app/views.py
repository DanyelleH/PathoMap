from django.shortcuts import render
from rest_framework.views import APIView, Response
from .models import User
from .serializer import UserSerializer
from rest_framework import status
# Create your views here.
class AllUsers(APIView):
    def get(self, request):
        user = user.objects.order_by("pk")
        serializer = UserSerializer(user)
        return Response(serializer.data)
    # ContentType.objects.filter(app_label='patient_app').update(app_label='users_app')
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
        user=User.objects.get(id=id)
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserHistory(APIView):
    def get():
        pass
    
    def put(self,request):
        #update Users history to contain diseases in remission
        pass


class Current_Diseases(APIView):
    def get():
        pass

    def put():
        #update Users record with newer concern
        pass

    def post():
        #add new record to the Users current disease record.
        pass