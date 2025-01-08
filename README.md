# Personal Project API Prototype
Protein Function API
    What it does: 
        - Allows users with authorization to access patient data, and giving them the ability to obtain disease information to educate patients on the condition.
        -Improve patient-Doctor relationships/ communication, Improve patient health literacy by providing summary of their conditions.

Proteins app: Utilized UniProt API : https://www.ebi.ac.uk/proteins/api/doc/#/
    endpoint: www.ebi.ac.uk/proteins/api/proteins/<accessionID>
        - speicific protein accessible through 'accession' or 'id'.
        - when querying a protein, save information for that protein in database locally.
        
        - Given the sequence/ identifier of a protein, the API provides information about that protein.
    Attributes:

        Name:  

        Function: 

        Disease: 

Patients app:
    Attributes:
        - name
        - age
        - affected_proteins: many to many field( protein, related_name = proteins)
        

    -holds patient information, along with a reference to patients protein deficencies/mutations. (CRUD)
        - A view that allows a patients information to be viewed, along with description of their protein deficiencies.
        - Authentication allowing only authorized users to access patient data.


Diseases app:
    - Provides disease information, connected to patients (M2M relationship)
    Attributes:
        name
        type: ( genetic, infectious, chronic, etc )
        description
        proteins (manytomany)
        patients (manytomany)
        symptoms: 
