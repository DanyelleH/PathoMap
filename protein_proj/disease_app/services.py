import requests
from bs4 import BeautifulSoup
# from .models import Disease
import xmltodict
import json

def fetch_disease_data(disease_name):
    medline_url = f"https://wsearch.nlm.nih.gov/ws/query?db=healthTopics&term={disease_name}"
    medline_response = requests.get(medline_url)
    if medline_response.status_code == 200:
        medline_data = medline_response.text
        parsed_data = xmltodict.parse(medline_data)
        json_data = json.loads(json.dumps(parsed_data, indent=4))
    
        full_summary = json_data["nlmSearchResult"]["list"]["document"][0]["content"]

        cleaned_text = " Full Summary not available"

        for item in full_summary:
            if item["@name"] == "FullSummary":
                cleaned_text = BeautifulSoup(item["#text"], 'html.parser').get_text()
                break
            # grab information of interest from the json data. 
        return cleaned_text
    else: 
        return " Couldn't fetch data"

print(fetch_disease_data("asthma"))