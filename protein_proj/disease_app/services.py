import requests
import urllib.parse
from bs4 import BeautifulSoup
# from .models import Disease
import xmltodict
import json
import re

def fetch_disease_data(disease_name):
    words = disease_name.split(" ")
    disease_name= words[0].lower()
    disease_name = disease_name.split(",")
    
    # method to fetch MEDLINE Information
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
        
        nlm_results = json_data.get("nlmSearchResult",{})
        document_list = nlm_results.get("list",{}).get("document",[])
        if document_list:
            full_summary = document_list[0].get("content", "")
            if isinstance(full_summary, str) and full_summary.strip():
                cleaned_text = full_summary
            elif isinstance(full_summary, list):
                cleaned_text = "Full Summary not available"
                for item in full_summary:
                    if item["@name"] == "FullSummary":
                        cleaned_text = BeautifulSoup(item["#text"], 'html.parser').get_text()
                        break 
            else:
                 cleaned_text = "Full Summary not available"
                
                    
            cleaned_text = re.sub(r'(?<=[a-z])(?=[A-Z])', ', ', cleaned_text)
            cleaned_text = cleaned_text.replace(".", ". ").replace(":", ":\n\n").replace("•", "\n-").replace("?", "? ").replace("!", "! ")
            return cleaned_text
        else:
            return "No documents found for this disease"
    else:
        return "Couldn't fetch data"
