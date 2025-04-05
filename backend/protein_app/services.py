import requests
from .models import Protein
from disease_app.models import Disease
from disease_app.services import fetch_disease_data

def fetch_protein_data(accession_id):
        # with each call, the protein and disease information structured at the same time
        # since there is an association.
    if accession_id is not None:
        url = f"https://rest.uniprot.org/uniprotkb/{accession_id}.json"
        response = requests.get(url)
        
        if response.status_code != 200:
            return " Failed to fetch protein information"
        data = response.json()
        protein_description = data.get("proteinDescription", {})

        name = (protein_description.get("recommendedName", {}).get("fullName", {}).get("value")
            or next(
                (sn.get("fullName", {}).get("value") for sn in protein_description.get("submissionNames", []) if "fullName" in sn),
                None))
        print(f"Protein Name: {name}")
            
        comments = data.get("comments", [])
        disease_comments = [comment for comment in comments if comment.get("commentType") == "DISEASE"]
        #     # if there isnt any disease associations, do not save result. 
        if disease_comments:
            function_comments = [comment.get('texts', [{}])[0].get("value", "")
                                for comment in comments 
                                if comment.get("commentType") == "FUNCTION" ]
            
            # Create the protein entry
            protein, created = Protein.objects.get_or_create(
                accession_id=accession_id,
                defaults={
                    'name': name,
                    'function': ";".join(function_comments),
                }
            )

            # Create disease objects for each associated disease
            for disease in disease_comments:
                disease_data = disease.get('disease', {}) 
                disease_name = disease_data.get("diseaseId")
                patient_summary = fetch_disease_data(disease_name) if disease_name else None
                    # dont save diseases with no patient summary available
                if not patient_summary:
                    print(f"Skipping disease {disease_name} as no patient summary is available.")
                    continue
                else:
    
                    description = disease_data.get("description","")
                            #get_or_create automatically saves disease
                    disease_obj, created = Disease.objects.get_or_create(
                        disease_name=disease_name,
                        defaults={"description": disease_data.get("description", "")},
                    )
                    if created or not disease_obj.patient_summary:
                        disease_obj.patient_summary = fetch_disease_data(disease_name)
                        disease_obj.save()
            return protein


def fetch_protein_data_by_name(name):
    # Step 1: Search UniProt for the protein by name to get the accession ID
    search_url = f"https://rest.uniprot.org/uniprotkb/search?query={name}&fields=accession"
    search_response = requests.get(search_url)

    if search_response.status_code != 200:
        raise Exception(f"Failed to fetch accession ID for protein name: {name}")
    search_data = search_response.json()
        # Extract the first accession ID
    accession_id = search_data.get("results", [])[0].get("primaryAccession", None)
    if not accession_id:
        raise Exception(f"No accession ID found for protein name: {name}")
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
