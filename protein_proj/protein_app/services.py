import requests
from .models import Protein
from disease_app.models import Disease
from disease_app.services import fetch_disease_data

def fetch_protein_data(accession_id):
        # with each call, the protein and disease information structured at the same time
        # since there is an association.
        url = f"https://rest.uniprot.org/uniprotkb/{accession_id}.json"
        response = requests.get(url)
        
        if response.status_code == 200:
            data = response.json()
            # Extract relevant data
            protein_description = data.get("proteinDescription", {})
            if "reccomendedName" in protein_description:
                name = protein_description.get("recommendedName", {}).get("fullName").get("value", "")
            else:
                submission_names = protein_description.get("submissionNames", [])
                if submission_names:
                    name = submission_names[0].get("fullName", {}).get("value", "")
                else:
                    name = ""
            
            comments = data.get("comments", [])

            function_comments = [comment['texts'][0]["value"] for comment in comments if comment.get("commentType")== "FUNCTION" and 'texts' in comment]
            

            # Create the protein entry
            protein, created = Protein.objects.get_or_create(
                accession_id=accession_id,
                defaults={
                    'name': name,
                    'function': ";".join(function_comments),
                }
            )

            disease_comments = [comment for comment in comments if comment.get("commentType") == "DISEASE"]

        # Create disease objects for each associated disease
            for disease in disease_comments:
                disease_data = disease.get('disease', {}) 
                disease_name = disease_data.get("diseaseId")
                description = disease_data.get("description","")
                
                if disease_name:
                    #get_or_create automatically saves disease
                    disease_obj,_ = Disease.objects.get_or_create(
                        disease_name=disease_name,
                        defaults={"description": description},
                        patient_summary = fetch_disease_data(disease_name)
                    )

        # Add the disease to the protein's associated diseases
                    protein.associated_disease.add(disease_obj)
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

def fetch_protein_data_by_disease_name(disease_name):
    #obtain protein information and function for all proteins referencing the diseaseName.
    # a disease can have multiple associated accessions/ Proteins
    search_url = f"https://rest.uniprot.org/uniprotkb/search?query={disease_name}"
    query_response = requests.get(search_url)
    queryJSON = query_response.json()
    accession_ids = [result.get("primaryAccession") for result in queryJSON.get("results", []) if result.get("primaryAccession")]
    if not accession_ids:
        print(f"No protein found for disease: {disease_name}")
        return None
    for accession_id in accession_ids:
        fetch_protein_data(accession_id)