import requests
from .models import Protein
from disease_app.models import Disease

def fetch_protein_data(accession_id):
        url = f"https://rest.uniprot.org/uniprotkb/{accession_id}.json"
        response = requests.get(url)
        
        if response.status_code == 200:
            data = response.json()
            # Extract relevant data
            name = data.get("proteinDescription", {}).get("recommendedName", {}).get("fullName").get("value", "")
            print(name)
            # function = [item.value for item in data.get("comments", []) if item.get("commentType") == "FUNCTION"]
            # print(function)


            # Create the protein entry
            # protein, created = Protein.objects.get_or_create(
            #     accession_id=accession_id,
            #     defaults={
            #         'name': name,
            #         'function': function,
            #     }
            # )

            # associated_diseases = [item for item in protein_data.get("comments", []) if item.get("commentType") == "DISEASE"]


        #     # Create disease objects for each associated disease
        #     for item in associated_diseases:
        #         disease_data = item.get("disease", {})
        #         disease, created = Disease.objects.get_or_create(
        #             name=disease_data.get("diseaseId"),
        #             defaults={"description": disease_data.get("description")},
        #         )

        #         # Add the disease to the protein's associated diseases
        #         protein.associated_disease.add(disease)

        #     return protein  # Return the newly created protein

        # else:
        #     raise Exception(f"Failed to fetch data for accession ID {accession_id}")





        from protein_app.services import fetch_protein_data
        protein = fetch_protein_data("P05067")