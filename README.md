# Protein-Disease Quick Reference API

Overview

The Protein Function API enables users to quickly access protein function data and diseases associated with protein mutations or deficiencies using he proteins name. By leveraging the UniProt database, this API provides accurate insights into protein roles and their connections to diseases, saving time and accelerating research efforts.

#### Usage : To start the API:

```
./run_compose.sh
```

## Proteins App
	• accession_id: Unique identifier for the protein.
	• name: The protein’s name.
	• function: Description of the protein’s role.
	• associated_disease: List of diseases linked to the protein.

`Note: If a protein is not found in the local database, it will automatically be fetched from the UniProt API and added to the database.`

Endpoints:
	1.	Access specific protein data by name, using underscores to separate words in the URL.
        
        Examples:
	•	Alpha-1 antitrypsin: 
                localhost:8000/api/v1/protein/Alpha1-antitrypsin


	•	Aspartate aminotransferase, mitochondrial:
                        localhost:8000/api/v1/protein/Aspartate_aminotransferase,_mitochondrial

## Diseases App

	• name: Disease name.
	• description: Detailed description of the disease.
	• common symptoms: (Not implemented) *
	• stages_of_progression: (Not implemented) *
	• treatments: (Not implemented) *

## Patient App
Used to track patients, or research participants. 

	• name: Patient’s full name.
	• dob: Date of birth.
	• deficiency_history: History of any deficiencies.
	• current_illness: Information on the patient’s current health issues.

### CRUD Operations

1. Get All Patients (Read):

	• Endpoint: /patients/

	•	Description: Retrieve all patients in a serialized format.

2. Create Patient (Create):

	•	Endpoint: /patients/create/

	•	Permissions: Group-based permissions required.

	•	Description: Accept patient details via a form or JSON to create a new patient entry.

3. Update Patient (Update):

	•	Endpoint: /patients/<id>/update/

	•	Permissions: User-based permissions required.

	•	Description: Update a patient’s information using their unique ID.

4. Delete Patient (Delete):

	•	Endpoint: /patients/<id>/delete/

	•	Permissions: User-based permissions required.

	•	Description: Remove a patient entry by their unique ID and handle duplicate entries.