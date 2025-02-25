from django.contrib import admin
from django.urls import path, include
from .views import PossibleConditions
urlpatterns = [
    path("", PossibleConditions, name="symptom_input" )
 ]
