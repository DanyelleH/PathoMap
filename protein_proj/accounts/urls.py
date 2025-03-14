# accounts.urls
from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import SignupView, UserById, AllUsers, SavedReadings, SavedSymptoms

urlpatterns = [
    path('get-token/', obtain_auth_token),
    path('signup/', SignupView.as_view()),
    path('all_users', AllUsers.as_view(), name='All_User'),
    path('<str:username>/', UserById.as_view(), name='User_by_id'),
    path('<str:username>/saved_readings', SavedReadings.as_view(), name='saved_readings'),
    path('<str:username>/symptom_analysis', SavedSymptoms.as_view(), name='symptom_analysis')
]