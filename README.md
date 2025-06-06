# PathoMap - Patient Health Education Platform (v0.0.2)

## 🩺 Overview

**PathoMap** is a full-stack medical information tool that empowers users to explore potential conditions based on their symptoms, and retrieve trustworthy biomedical data on diseases and proteins. It aims to replace generic internet searches with structured, reliable information from vetted sources.

The platform combines **AI-powered symptom analysis** with **medical reference APIs** (MedlinePlus, UniProt) to help users better understand health concerns and underlying biology—all in one interface.

---

## 💡 Key Features

1. **Natural Language Symptom Analysis**  
   - Accepts user input (e.g., *"I've had chest tightness and nausea"*)  
   - Uses **OpenAI GPT-3.5 (3o)** to return the top 3 possible conditions, ranked by likelihood  

2. **Condition Lookup Tool**  
   - Search for any disease by name  
   - Retrieves structured information from **MedlinePlus** and **UniProt**, including summaries and protein associations  

3. **Saved Readings**  
   - Users can store symptom analyses and disease searches for future review  
   - In-progress: UI to manage saved readings and improve revisit experience

---

## ⚙️ Tech Stack

- **Frontend**: React (JavaScript), Vite  
- **Backend**: Django, Django REST Framework  
- **AI Integration**: OpenAI API  
- **External Data**: MedlinePlus API, UniProt API  
- **Cloud**: AWS EC2  
- **DevOps**: Docker, Postman  
- **Auth & Storage**: Django Custom User Model, PostgreSQL  

---

## 🚀 Getting Started

### 🐳 Backend Setup (via Docker)
```bash
cd backend
docker compose up -d
### Frontend Setup
cd frontend
npm install
npm run dev
```
# API Documentation

### Protein Data (Proteins App)
Allows users to retrieve detailed protein functional information.
```
	GET /api/v1/protein/ — View all proteins
	GET /api/v1/protein/{accession_id} — Get protein by UniProt Accession ID
```


### Disease Information API (Diseases App)

Provide general and clinically relevant disease descriptions.
```
	GET api/v1/diseases/ -> View all Diseases in database
	GET api/v1/diseases/${pk} -> Obtain detailed info by pk
	GET api/v1/diseases/${disease_name} ->  Get a disease by namewith associated protein data
```

### Symptom-to-Condition (Diagnosis):
```
	No model — uses OpenAI’s API to generate conditions from symptoms
```

### User Tracking (accounts)
Extended Django user model includes: 
 
	dob — Intended for future diagnosis model refinement
	saved_readings — User’s saved disease searches
	saved_symptoms — User’s saved symptom analyses

#### Endpoints:
```
	POST /api/v1/accounts/signup
	POST /api/v1/accounts/get-token
	GET /api/v1/accounts/{username}
	GET /api/v1/accounts/{username}/saved_readings
	GET /api/v1/accounts/{username}/symptom_analysis
```
# Roadmap / In Progress
	• Improve UI/UX and responsiveness for mobile
	• Add password confirmation to sign-up form
	• Expand disease name matching to support misspellings and variations
	• Improve error handling and user notifications

## Acknowledgements
MedlinePlus
Uniprot
OpenAI


Built with care to support patient education and informed healthcare decisions.