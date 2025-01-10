# Personal Project API Prototype
Protein Function API
    What it does: 
        - Allows user to quickly access protein function data and diseases associated with the proteins using an accession ID. By leveraging the UniProt database, this API delivers accurate insights into protein roles, and diseases connected to them saving time and accelerating research efforts.

Proteins app: Utilized UniProt API : https://www.ebi.ac.uk/proteins/api/doc/#/
    Attributes:
        Name:  
        Function: 
        Disease: 
        
    endpoint:
        - when querying a protein, save information for that protein in database locally.
        - speicific protein accessible through name, words seperated by underscores in url.
        



Diseases app:
    - Provides disease information, connected to patients (M2M relationship)
    Attributes:
        name
        type: ( genetic, infectious, chronic, etc )
        description
        proteins (manytomany)
        patients (manytomany)
        symptoms: 
