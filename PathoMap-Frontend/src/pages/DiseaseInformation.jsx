import React from "react"
import { useParams } from "react-router-dom"
import {Box} from "@mui/material"
import { saveDiseaseInfo } from "../api/usersAPI"
import { useState } from "react"
export default function DiseaseInformation() {
    const {diseasePk} = useParams()
    const [ notification , setNotification]= useState("")
    const diseases = JSON.parse(localStorage.getItem("DiseaseSearch")) || [];
    
    const disease = diseases.find((d) => d.pk.toString() === diseasePk);
    
    const handleClick = async (e) => {
        e.preventDefault()
        const userToken = localStorage.getItem("userToken")
        const username =localStorage.getItem("username")

        const context ={disease_name: disease.disease_name}
        const response = await saveDiseaseInfo(username, userToken,context)
        console.log(response)
        if (response.error) {
            setNotification(response.error)
        } else {
            setNotification(response)
        }
    }

    // ## this is all disease search info, i want each to direct to this page with their corresponding info
    return (
        <> 
        {notification}
        <div> 
        <h2> {disease.disease_name}</h2>
        <button onClick={handleClick} >Save for later</button>
        </div>
        <Box>
            <p>Disease Description: {disease.description}</p>
        </Box>
        
            <p>Disease Summary: {disease.patient_summary}</p>
        </>
    )
}