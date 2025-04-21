# PathoMap - Patient Health Education
## Description

Pathomap provides a user with quick access to Disease information, symptom search, and additional research information about the disease process with proteins involved. This tool is meant to improve patient education and research efficiency by leveraging data from the UniProt database and MedlinePlus API to deliver accurate insights into protein roles and related conditions. Symptom analysis is performed utilizing OpenAI 3o model. 

## Features

	1. Access Disease information by searching its name 
		- need to streamline user input for variable variations to improve inclusivity of returned results

	2. Symptom analysis from users plain text "Chief complaint", returning a ranked list of 3 potential differentials, ranked from most likely to least.

	3. Ability to store readings ( symptom analysis and Disease searches) for quick access later.
		- working on implementation of re-accessing symptom searched
		

### Installation : 

```python
cd backend

docker compose up -d
```

Start Frontend Seperately:
```python
cd frontend
npm install
npm run dev

```
# API Documentation (Organizing section in progress)

### Protein Data API (Proteins App)
Allows users to retrieve detailed protein functional information.
```
	• Models:
		- accession_id, name, function
```
#### Endpoints:

```
localhost:8000/api/v1/protein/   -> View all saved proteins in database
localhost:8000/api/v1/protein/${protein_accession} -> Obtain protein by Uniprot Accession Number

```


### Disease Information API (Diseases App)

Provide general and clinically relevant disease descriptions.
```
	• Model:
 		- disease_name, description, patient_summary, associated_proteins
```
#### Endpoints:
```
localhost:8000/api/v1/diseases/ -> View all Diseases in database
localhost:8000/api/v1/diseases/${pk} -> Obtain detailed info on disease by its pk
localhost:8000/api/v1/diseases/${disease_name} ->  Obtain a disease by name, gathering associated proteins in the process
```

### Diagnosis (accounts):
```
	No model, Responsible for performing analysis via OpenAI through views.
```

### User Tracking (accounts)
Contains all fields included in Django Built in Users Model, with the following added: 
 
• dob: needed to improve diagnosis models accuracy in future versions.

• current_readings: Users saved queries

• saved_symptoms: Users saved symptom analysis queries

#### Endpoints:
```
localhost:8000/api/v1/accounts/signup
localhost:8000/api/v1/accounts/get-token
localhost:8000/api/v1/accounts/${username}  -> Users profile information
localhost:8000/api/v1/accounts/${username}/saved_readings  -> Users saved disease searches
localhost:8000/api/v1/accounts/${username}/symptom_analysis  -> A users saved symptoms
```

In Progress Implementations: 
** Improving UI and Design
** Improvements of disease search to improve result inclusion.
** Improve sign up with confirmation of password
** Improvements in validation and user notification of causes of errors

## Acknowledgements

