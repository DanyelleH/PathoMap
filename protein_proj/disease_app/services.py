import requests
from bs4 import BeautifulSoup
# from .models import Disease
import xmltodict
import json
import re

def fetch_disease_data(disease_name):
    medline_url = "https://wsearch.nlm.nih.gov/ws/query"
    paramaters= {
        'db' : 'healthTopics',
        'term': disease_name
    }
    response = requests.get(medline_url, params=paramaters)
    if response.status_code == 200:
        parsed_data = xmltodict.parse(response.content)
        json_data = json.loads(json.dumps(parsed_data, indent=4))
        # return parsed_data
    
        full_summary = json_data["nlmSearchResult"]["list"]["document"][0]["content"]
        cleaned_text = " Full Summary not available"

        for item in full_summary:
            if item["@name"] == "FullSummary":
                cleaned_text = BeautifulSoup(item["#text"], 'html.parser').get_text()
                break 
            else:
             return None
        
        cleaned_text = re.sub(r'(?<=[a-z])(?=[A-Z])', ', ', cleaned_text)
        cleaned_text = cleaned_text.replace(".", ". ").replace(":", ":\n\n").replace("•", "\n-")
        return cleaned_text
    return " Couldn't fetch data"

asthma = fetch_disease_data("asthma")
# asthma_symptoms = get_symptoms(asthma)
print(asthma)