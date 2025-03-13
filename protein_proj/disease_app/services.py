import requests
import xml.etree.ElementTree as ET
import re
from bs4 import BeautifulSoup

def fetch_disease_data(disease_name):
    disease_name = disease_name.replace(",", " ")
    
    # method to fetch MEDLINE Information and format from XML
    medline_url = "https://wsearch.nlm.nih.gov/ws/query"
    paramaters= {
        'db' : 'healthTopics',
        'term': disease_name
    }

    response = requests.get(medline_url, params=paramaters)

    if response.status_code != 200:
        return "Issue fetching disease summary"
    root = ET.fromstring(response.content)

    first_document = root.find(".//document")

    if first_document is None:
            return "No documents to obtain summary"
            # Extract <content> elements inside <document>
    full_summary = "Full Summary not available"
    for content in first_document.findall("content"):
        if content.attrib.get("name") == "FullSummary":
            full_summary = BeautifulSoup(content.text, "html.parser").get_text()
            break  # Stop after finding FullSummary

    # Clean and format extracted text
    cleaned_text = re.sub(r'(?<=[a-z])(?=[A-Z])', ', ', full_summary)
    cleaned_text = cleaned_text.replace(".", ". ") \
                                .replace(":", ": \n\n") \
                                .replace("•", "\n-") \
                                .replace("?", "? ") \
                                .replace("!", "! ")

    return cleaned_text
