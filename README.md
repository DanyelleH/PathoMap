# PathoMap - Patient Health Education
## Description

Pathomap provides a user with quick access to Disease information, symptom search, and additional research information about the disease process with proteins involved. This tool is meant to improve patient education and research efficiency by leveraging data from the UniProt database and MedlinePlus API to deliver accurate insights into protein roles and related conditions.

In future versions, connection to LIMS could allow patients to access readings on their conditions almost instantly.

## Features

	1. Access Disease information by searching Disease name 

	2. Symtom analysis from users plain text query, returning a ranked list of Differentials ( In Progress) 

	3. Ability to store readings for quick access later.

### Installation : 
Create a venv running Python@3.12 or older to avoid errors running scispacy
```python
# if Python 3.11 not available, install it
	brew install python@3.11
# Create venv w that version to suport quick umls	
	python3.11 -m venv PathomapVenv

cd protein_proj

./run_compose.sh
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

```
`Note: If a protein is not found in the local database, it will automatically be fetched from the UniProt API and added dynamically. The same goes for Diseases`


### Disease Information API (Diseases App)

Provide general and clinically relevant disease descriptions.
#### Endpoints:
```

```

## User Tracking (accounts)
Contains all fields included in Django Built in Users Model, with the following added: 
 
• dob: needed to improve diagnosis models accuracy.

• current_readings: Users saved queries
#### Endpoints:
```

```


## Acknowledgements
https://s3-us-west-2.amazonaws.com/ai2-s2-scispacy/releases/v0.5.4/en_ner_bc5cdr_md-0.5.4.tar.gz ( description pending) 