# Personal Project API Prototype
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
    -    speicific protein accessible through name, words seperated by underscores in url.
        


Diseases app:
    Attributes:
        name
        description:
        common symptoms:
        stages_of_progression:
        treatments:


