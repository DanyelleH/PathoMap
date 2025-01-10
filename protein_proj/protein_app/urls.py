from django.urls import path
from .views import AllProteins, OneProtein

# register_converter(SpaceToDashConverter,'spacedash')

urlpatterns =[
    path("", AllProteins.as_view(), name="all_proteins"),
    path("<str:name>/", OneProtein.as_view(), name="one_protein")
]