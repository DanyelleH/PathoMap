from django.urls import path
from .views import AnalyzeSymptomsView

urlpatterns = [
    path('analyze-symptoms/', AnalyzeSymptomsView.as_view(), name='analyze_symptoms'),
]