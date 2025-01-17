from django.contrib import admin
from django.urls import path
from .views import PatientById, AllPatients, Patient_History,Current_Diseases

urlpatterns = [
    path('', AllPatients.as_view(), name='add_patient'),
    path('<int:id>/', PatientById.as_view(), name='patient_by_id'),
    path('<int:id>/history', Patient_History.as_view(), name='patient_history'),
    path('<int:id>/current', Current_Diseases.as_view(), name='current_diseases')
]