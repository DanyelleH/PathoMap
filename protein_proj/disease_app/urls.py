from django.contrib import admin
from django.urls import path, include
from .views import AllDiseases
urlpatterns = [
    path("", AllDiseases.as_view(), name="all_diseases")
]
