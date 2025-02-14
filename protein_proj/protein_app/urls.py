from django.urls import path, include
from .views import AllProteins, OneProtein, ProtienDataByDisease


# register_converter(SpaceToDashConverter,'spacedash')

urlpatterns =[
    path("", AllProteins.as_view(), name="all_proteins"),
    path("<str:parameter>/", OneProtein.as_view(), name="prot_by_name"),
    path("<int:parameter>/", OneProtein.as_view(), name="prot_by_accession")
]