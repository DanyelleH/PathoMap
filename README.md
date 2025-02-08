# Protein-Disease Quick Reference API

## Overview

Purpose: Allow quicker notification of major concerns to patients and easier access to disease process information and descriptions to imporve patient education.

The Protein Function API enables users to quickly access protein function data and 
diseases associated with deficiencies in these proteins. Proteins are obtained most 
efficiently using` Uniprot Accession_id`, but the proteins name is an alternative. By 
leveraging the UniProt database, this API provides accurate insights into protein roles 
and their connections to diseases, saving time and accelerating research efforts. A summary of 
each condition is obtained via `Medline Plus API`. As proteins are added to the database, the 
associated information is added dynamically.

By integrating LIMS to obtain acession_id and store the proteins information, we obtain quick responses to possible concerns, along with relevant summaries for users.
`Patient Labs -> LIMS -> Obtain protein data`

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

* Need to add encoded url**
	1.	Access specific protein data by name, using underscores to separate words in the URL.
        
        Examples:
	•	Alpha-1 antitrypsin: 
                localhost:8000/api/v1/protein/Alpha1-antitrypsin


	•	Aspartate aminotransferase, mitochondrial: ** implement url encoder to clean this? **
                        localhost:8000/api/v1/protein/Aspartate_aminotransferase,_mitochondrial

	2. Access by Uniprot Primary accessions 
						localhost:8000/api/v1/protein/Q6P3S1

## Diseases App

	• name: Disease name.
	• description: General description of the disease for professional Information
	• patient_summary: Clinically related information from Medline

	
## User App
Used to track users, or research participants. 

	• first_name:
	• last_name: 
	• dob: Date of birth.
	• current_diseases: List of relevant disease info per patient.


## Future Features
- User authentication with roles (admin, patient, staff, provider)
- API integration with real LIMS for sample data retrieval
- Real-time sample result reporting