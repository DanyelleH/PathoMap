from django.contrib import admin
from django.urls import path
from .views import UserById, AllUsers, CurrentDisease

urlpatterns = [
    path('', AllUsers.as_view(), name='add_User'),
    path('<int:id>/', UserById.as_view(), name='User_by_id'),
    path('<int:id>/current_disease', CurrentDisease.as_view(), name='current_diseases')
]