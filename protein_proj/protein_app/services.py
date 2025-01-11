import requests
from .models import Protein
from disease_app.models import Disease

def fetch_protein_data(accession_id):
        # with each call, the protein and disease information structured at the same time
        # since there is an association.
        url = f"https://rest.uniprot.org/uniprotkb/{accession_id}.json"
        response = requests.get(url)
        
        if response.status_code == 200:
            data = response.json()
            # Extract relevant data
            name = data.get("proteinDescription", {}).get("recommendedName", {}).get("fullName").get("value", "")
            
            comments = data.get("comments", [])

            function_comments = [comment['texts'][0]["value"] for comment in comments if comment.get("commentType")== "FUNCTION" and 'texts' in comment]
            
            disease_comments = [comment for comment in comments if comment.get("commentType") == "DISEASE"]

            # Create the protein entry
            protein, created = Protein.objects.get_or_create(
                accession_id=accession_id,
                defaults={
                    'name': name,
                    'function': function_comments,
                }
            )


        # Create disease objects for each associated disease
            associated_diseases = []
            for disease in disease_comments:
                disease_data = disease.get('disease', {}) 
                formatted_disease ={
                    "disease_name": disease_data.get("diseaseId"),
                    'disease_description': disease_data.get('description')
                }
                associated_diseases.append(formatted_disease)

                disease, created = Disease.objects.get_or_create(
                    disease_name=disease_data.get("diseaseId"),
                    defaults={"description": disease_data.get("description","")},
                )

        # Add the disease to the protein's associated diseases
                protein.associated_disease.add(disease)
                protein.save()
                return protein
        # improve to provide verification of successful creation
        else:
            raise Exception(f"Failed to fetch data for accession ID {accession_id}")


def fetch_protein_data_by_name(name):
    # Step 1: Search UniProt for the protein by name to get the accession ID
    search_url = f"https://rest.uniprot.org/uniprotkb/search?query={name}&fields=accession"
    search_response = requests.get(search_url)

    if search_response.status_code == 200:
        search_data = search_response.json()
        # Extract the first accession ID
        accession_id = search_data.get("results", [])[0].get("primaryAccession", None)
        if not accession_id:
            raise Exception(f"No accession ID found for protein name: {name}")
    else:
        raise Exception(f"Failed to fetch accession ID for protein name: {name}")

    # Step 2: Fetch detailed protein information using the accession ID
    return fetch_protein_data(accession_id)

        # from protein_app.services import fetch_protein_data
        # protein = fetch_protein_data("P05067")