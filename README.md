# Personal Project API Prototype
current version: not configured for run_compose.sh
Protein Function API
    What it does: 
        - Allows user to quickly access protein function data and diseases associated with the proteins using an accession ID. By leveraging the UniProt database, this API delivers accurate insights into protein roles, and diseases connected to them saving time and accelerating research efforts.

```python
# from the
   ./run_compose.sh 
```

## Proteins app: 
    Attributes:
        accession_id
        name  
        function 
        associated_disease 

If a protein is not yet in the local database, it will be added by querying UniProt API.

#### Endpoints:
- speicific protein accessible through name, words seperated by underscores in url.
    
        Alpha-1 antitrypsin:
             ex. localhost:8000/api/v1/protein/Alpha1-antitrypsin
        
        Aspartate aminotransferase, mitochondrial
            ex. localhost:8000/api/v1/protein/Aspartate_aminotransferase,_mitochondrial
            


## Diseases app:
    Attributes:
        name
        description:
        common symptoms:      <!-- <not implemented> -->
        stages_of_progression:      <!-- <not implemented> -->
        treatments:       <!-- <not implemented> -->


## Patient_app
    Attributes: 
    name
    dob
    deficiency_history
    current_illness

# Implementing CRUD operations


  Views

	1.	Get All Patients (Read):
        •	Endpoint: /patients/
        •	Return all patients in a serialized format.
	2.	Create Patient (Create): ( Group permissions)
        •	Endpoint: /patients/create/
        •	Accept patient details via a form or JSON.
	3.	Update Patient (Update): (user permissions)
        •	Endpoint: /patients/<id>/update/
        •	Update patient information based on their unique ID.
	4.	Delete Patient (Delete): (user permissions)
        •	Endpoint: /patients/<id>/delete/
        •	remove duplicates.

```
Looking at adding serializer to protein add.
continue CRUD operations ( create, update) 
```