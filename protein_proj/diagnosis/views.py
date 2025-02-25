import os
from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests
import spacy

API_URL =  "https://api-inference.huggingface.co/models/medgpt"
# Create your views here.
HF_API_KEY = os.getenv("HF_API_KEY")
HEADERS = {"Authorization": f"Bearer {HF_API_KEY}"}
nlp = spacy.load("en_ner_bc5cdr_md")


@api_view(["POST"])
def PossibleConditions(request):
    user_complaint=request.data.get("input","").strip()
    
    doc = nlp(user_complaint)

    symptoms=[]
    for ent in doc.ents:
        if ent.label_ in ["DISEASE"]:
            symptoms.append(ent.text)
    return Response(symptoms)