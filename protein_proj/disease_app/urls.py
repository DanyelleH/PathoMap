from django.contrib import admin
from django.urls import path, include
from .views import AllDiseases, OneDisease
urlpatterns = [
    path("", AllDiseases.as_view(), name="all_diseases"),
    path("<int:pk>/",OneDisease.as_view(), name="one_disease")
]
