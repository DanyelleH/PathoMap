# Personal Project API Prototype
current version: not configured for run_compose.sh
Protein Function API
    What it does: 
        - Allows user to quickly access protein function data and diseases associated with the proteins using an accession ID. By leveraging the UniProt database, this API delivers accurate insights into protein roles, and diseases connected to them saving time and accelerating research efforts.

Proteins app: 
    Attributes:
        accession_id
        name  
        function 
        associated_disease 

    If a protein is not yet in the local database, it will be added by querying UniProt API.
    Endpoints:
    -    speicific protein accessible through name, words seperated by underscores in url.
        ex. 
            Alpha-1 antitrypsin -> localhost:8000/api/v1/protein/Alpha1-antitrypsin
            Aspartate aminotransferase, mitochondrial -> localhost:8000/api/v1/protein/Aspartate_aminotransferase,_mitochondrial
            


Diseases app:
    Attributes:
        name
        description:
        common symptoms:      <!-- <not implemented> -->
        stages_of_progression:      <!-- <not implemented> -->
        treatments:       <!-- <not implemented> -->


