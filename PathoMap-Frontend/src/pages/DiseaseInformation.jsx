import React from "react"
import { useParams } from "react-router-dom"
export default function DiseaseInformation() {
    const {diseasePk} = useParams()
    
    const diseases = JSON.parse(localStorage.getItem("DiseaseSearch")) || [];
    
    const disease = diseases.find((d) => d.pk.toString() === diseasePk);

    // ## this is all disease search info, i want each to direct to this page with their corresponding info
    return (
        <> 
        <h2> {disease.disease_name}</h2>
            <p>Disease Description: {disease.description}</p>
            <p>Disease Summary: {disease.patient_summary}</p>
        </>
    )
}