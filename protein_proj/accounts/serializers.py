from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()

class SignupSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "password"]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['pk','username','email','first_name','last_name','dob', "current_readings"]