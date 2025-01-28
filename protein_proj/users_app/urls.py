from django.contrib import admin
from django.urls import path
from .views import UserById, AllUsers, UserHistory,Current_Diseases

urlpatterns = [
    path('', AllUsers.as_view(), name='add_User'),
    path('<int:id>/', UserById.as_view(), name='User_by_id'),
    path('<int:id>/history', UserHistory.as_view(), name='User_history'),
    path('<int:id>/current', Current_Diseases.as_view(), name='current_diseases')
]