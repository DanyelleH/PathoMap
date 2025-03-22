# PathoMap - Patient Health Education
## Description

Pathomap provides a user with quick access to Disease information, symptom search, and additional research information about the disease process with proteins involved. This tool is meant to improve patient education and research efficiency by leveraging data from the UniProt database and MedlinePlus API to deliver accurate insights into protein roles and related conditions.

In future versions, connection to LIMS could allow patients to access readings on their conditions almost instantly.

## Features

	1. Access Disease information by searching Disease name 

	2. Symtom analysis from users plain text query, returning a ranked list of Differentials 

	3. Ability to store readings for quick access later.

### Installation : 
Create a venv running Python@3.12 or older to avoid errors running scispacy
```python
cd protein_proj

./run_compose.sh
```

** To Run seperately ( in case of compose error)
```
cd protein_proj
docker compose up
```

Start Frontend Seperately:
```python
cd Pathomap-Frontend
npm install
npm run dev

```
# API Documentation (Organizing section in progress)

### Protein Data API (Proteins App)
Allows users to retrieve detailed protein functional information.

#### Endpoints:

```
localhost:8000/api/v1/protein/     -> View all saved proteins in database
localhost:8000/api/v1/protein/${protein_accession} -> Obtain protein by Uniprot Accession Number

```
`Note: If a protein is not found in the local database, it will automatically be fetched from the UniProt API and added dynamically. The same goes for Diseases`


### Disease Information API (Diseases App)

Provide general and clinically relevant disease descriptions.
#### Endpoints:
```
localhost:8000/api/v1/diseases/ -> View all Diseases in database
localhost:8000/api/v1/diseases/${pk} -> Obtain detailed info on disease by its pk
localhost:8000/api/v1/diseases/${disease_name} ->  Obtain a disease by name, gathering associated proteins in the process
```

## User Tracking (accounts)
Contains all fields included in Django Built in Users Model, with the following added: 
 
• dob: needed to improve diagnosis models accuracy in future versions.

• current_readings: Users saved queries
#### Endpoints:
```
localhost:8000/api/v1/accounts/signup
localhost:8000/api/v1/accounts/get-token
localhost:8000/api/v1/accounts/${username}  -> Users profile information
localhost:8000/api/v1/accounts/${username}/saved_readings  -> Users saved disease searches
localhost:8000/api/v1/accounts/${username}/symptom_analysis  -> A users saved symptoms
```


## Acknowledgements
https://s3-us-west-2.amazonaws.com/ai2-s2-scispacy/releases/v0.5.4/en_ner_bc5cdr_md-0.5.4.tar.gz ( description pending) 
