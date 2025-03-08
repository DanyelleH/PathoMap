from quickumls import QuickUMLS
import requests

# Initialize QuickUMLS matcher
matcher = QuickUMLS('/Users/danyelleridley/GolfPlatoonImmersive/PersonalProject/PathoMap/protein_proj/diagnosis/umls_processed')

# Example input: Chief complaint
text = "The patient is experiencing frequent urination."

# Run QuickUMLS matcher to extract symptoms and possible diseases
matches = matcher.match(text, best_match=True, ignore_syntax=False)

# Extract disease candidates
diseases = [match['umls_ents'][0][0] for match in matches]  # This will return a list of CUIs (disease IDs)



# diseases = ["C0034243"]
# # Use MedlinePlus API to fetch disease information (example)
# def get_disease_name_from_cui(cui):
#     api_key = "931538fc-622d-4d14-a52a-a78a3fc7e2c9"  # Replace with your actual UMLS API key
#     url = f'https://uts-ws.nlm.nih.gov/rest/lookup/current/CUI/{cui}'
#     headers = {'Authorization': f'Bearer {api_key}'}
#     response = requests.get(url, headers=headers)
    
#     if response.status_code == 200:
#         # Extract disease name from the response (this depends on UMLS API response format)
#         data = response.json()
#         return data.get('name', 'Unknown Disease')
#     else:
#         return None

# print(get_disease_name_from_cui("C0034243"))

#get info on disease from medline 