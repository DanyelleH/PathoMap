# PathoMap - Patient Health Education

## Overview

The Protein Function API provides quick access to protein function data and information on diseases associated with protein deficiencies. This tool enhances patient education and research efficiency by leveraging data from the UniProt database and MedlinePlus API to deliver accurate insights into protein roles and related conditions.

By integrating with a Laboratory Information Management System (LIMS), the API automates the retrieval of accession IDs and protein information, ensuring fast responses to potential concerns.

#### Workflow Overview
```
Patient Labs -> LIMS -> Obtain protein data
```

### Usage : 
Create a venv running Python@3.12 or older to avoid errors running scispacy
```
commands: 
python3.12 -m venv venv

cd protein_proj

./run_compose.sh
```
https://s3-us-west-2.amazonaws.com/ai2-s2-scispacy/releases/v0.5.4/en_ner_bc5cdr_md-0.5.4.tar.gz ( model used) 

# Each Apps Responsibility
### Protein Data API (Proteins App)
Allows users to retrieve detailed protein functional information.

#### Fields:

• accession_id: Unique identifier for the protein.

• name: The protein’s name.

• function: Description of the protein’s role.

• associated_disease: List of diseases linked to the protein.

`Note: If a protein is not found in the local database, it will automatically be fetched from the UniProt API and added dynamically.`

Endpoints: 

`* Need to add encoded url**`

1.	Access specific protein data by name, using underscores to separate words in the URL.
        
     Examples:

	•	Alpha-1 antitrypsin:

                localhost:8000/api/v1/protein/Alpha1-antitrypsin

	•	Aspartate aminotransferase, mitochondrial:

    	localhost:8000/api/v1/protein/Aspartate_aminotransferase_mitochondrial

2. Access by Uniprot Primary accessions.

						localhost:8000/api/v1/protein/Q6P3S1

### Disease Information API (Diseases App)

Provide general and clinically relevant disease descriptions.

#### Fields:

• name: Disease name.

• description: General description of the disease

• patient_summary: Patient-Friendly summury from MedlinePlus.

	
## User Tracking (accounts)
Contains all fields included in Django Built in Users Model, with the following added: 
 
• dob: needed to improve diagnosis models accuracy.

• current_readings: Users saved queries


## Future Features
- User authentication with roles (admin, patient, staff, provider)

- API integration with real LIMS for sample data retrieval

- Real-time sample result reporting
