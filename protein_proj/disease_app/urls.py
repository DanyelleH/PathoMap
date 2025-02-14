from django.contrib import admin
from django.urls import path, include
from .views import AllDiseases, OneDisease, ProtienDataByDisease
urlpatterns = [
    path("", AllDiseases.as_view(), name="all_diseases"),
    path("<int:pk>/",OneDisease.as_view(), name="one_disease"),
    path("<str:disease_name>/", ProtienDataByDisease.as_view(), name="disease_by_name")
]
