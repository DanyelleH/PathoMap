import requests
import urllib.parse
from bs4 import BeautifulSoup
# from .models import Disease
import xmltodict
import json
import re

def fetch_disease_data(disease_name):
    words = disease_name.split(" ")
    disease_name = disease_name.split(",")
    
    # method to fetch MEDLINE Information and format from XML
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
        document_data = nlm_results.get("list",{}).get("document",[])

        if isinstance(document_data, dict):
            document_list = [document_data]
        elif isinstance(document_data, list):
            document_list = document_data
        else:
            document_list = []

        if document_list:
            first_document = document_list[0]
            full_summary = first_document.get("content", "")

            ## Full summary is a list if data is retrieved, if not it is a string.
            if isinstance(full_summary, list):
                for item in full_summary:
                    if item.get("@name") == "FullSummary":
                        full_summary = BeautifulSoup(item["#text"], 'html.parser').get_text()
                        break 
                    else:
                        full_summary= "Full Summary not available"
            elif isinstance(full_summary, str) and not full_summary.strip():
                full_summary = "Full Summary not available"

                    
            cleaned_text = re.sub(r'(?<=[a-z])(?=[A-Z])', ', ', full_summary)
            cleaned_text = cleaned_text.replace(".", ". ").replace(":", ": \n\n").replace("•", "\n-").replace("?", "? ").replace("!", "! ")
            print(cleaned_text)
            return cleaned_text
        
        return "No documents found for this disease"
    
    return "Couldn't fetch data"

