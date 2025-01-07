# Personal Project API Prototype

Since you will be working on your personal projects in a few weeks, it would be nice to start tinkering around. 

Try to strip down your idea to the simplest possible form.  Diagram out your models and anything else you might want to reference later.  Then, get to work building your API!


Protein Function API

Proteins app: Utilized UniProt API : https://www.ebi.ac.uk/proteins/api/doc/#/
    endpoint: www.ebi.ac.uk/proteins/api/proteins/<accessionID>
        - speicif protein accessible through 'accession' or 'id'.

- Given the sequence/ identifier of a protein, the API provides information about that protein.
    Name: protein -> reccomendedName -> fullName -> value
    AA_sequence:
    location: comments -> where type = Tissue_specificity -> text -> value
    Function: comments -> where type = function -> text -> value
    Disease: comments -> where type = Disease -> text -> value

Patients app
    -name
    - age
    - protein deficiencies: ,any to many field( protein, related_name = patients)

-holds patient information, along with a reference to patients protein deficencies/mutations. (CRUD)
    - A view that allows a patients information to be viewed, along with description of their protein deficiencies.
    - Authentication allowing only authorized users to access patient data.

Diseases app:
    - Provides disease inormation, connected to patients (M2M relationship)
        name
        type: ( genetic, infectious, chronic, etc )
        description
        proteins (manytomany)
        patients (manytomany )
- BlastAPI?? 