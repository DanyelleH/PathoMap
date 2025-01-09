# Personal Project API Prototype
Protein Function API
    What it does: 
        - Allows user to quickly access protein function data and diseases associated with the proteins using an accession ID. By leveraging the UniProt database, this API delivers accurate insights into protein roles, and diseases connected to them saving time and accelerating research efforts.

Proteins app: Utilized UniProt API : https://www.ebi.ac.uk/proteins/api/doc/#/
    endpoint: www.ebi.ac.uk/proteins/api/proteins/<accessionID>
        - speicific protein accessible through 'accession' or 'id'.
        - when querying a protein, save information for that protein in database locally.
        
        - Given the sequence/ identifier of a protein, the API provides information about that protein.
    Attributes:

        Name:  

        Function: 

        Disease: 



Diseases app:
    - Provides disease information, connected to patients (M2M relationship)
    Attributes:
        name
        type: ( genetic, infectious, chronic, etc )
        description
        proteins (manytomany)
        patients (manytomany)
        symptoms: 
