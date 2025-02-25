import os
from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests

API_URL =  "https://api-inference.huggingface.co/models/medgpt"
# Create your views here.
HF_API_KEY = os.getenv("HF_API_KEY")
HEADERS = {"Authorization": f"Bearer {HF_API_KEY}"}


@api_view(["POST"])
def PossibleConditions(request):
    user_complaint=request.data.get("input","").strip()
