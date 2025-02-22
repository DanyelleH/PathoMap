# PathoMap - Patient Health Education

## Overview

The Protein Function API provides quick access to protein function data and information on diseases associated with protein deficiencies. This tool enhances patient education and research efficiency by leveraging data from the UniProt database and MedlinePlus API to deliver accurate insights into protein roles and related conditions.

By integrating with a Laboratory Information Management System (LIMS), the API automates the retrieval of accession IDs and protein information, ensuring fast responses to potential concerns.

#### Workflow Overview
```
Patient Labs -> LIMS -> Obtain protein data
```

### Usage : 
To start the API:

```
./run_compose.sh
```

## Protein Data API (Proteins App)
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

## Disease Information API (Diseases App)

Provide general and clinically relevant disease descriptions.

#### Fields:

• name: Disease name.

• description: General description of the disease

• patient_summary: Patient-Friendly summury from MedlinePlus.

	
## User Tracking API (User App)
Used to track users, or research participants. 

• first_name:

• last_name: 

• dob: Date of birth.

• current_diseases: List of relevant disease info per patient.


## Future Features
- User authentication with roles (admin, patient, staff, provider)

- API integration with real LIMS for sample data retrieval

- Real-time sample result reporting
