import React from "react"
import { useParams } from "react-router-dom"
import { saveDiseaseInfo } from "../api/usersAPI"
import { useState } from "react"
import { Box, Button, Accordion, AccordionSummary, AccordionDetails, Typography, Alert } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
export default function DiseaseInformation() {
    const {diseasePk} = useParams()
    const [ notification , setNotification]= useState("")
    const diseases = JSON.parse(localStorage.getItem("DiseaseSearch")) || [];
    
    let disease = diseases.find((d) => d.pk.toString() === diseasePk);
    if (!disease) {
        disease = JSON.parse(localStorage.getItem("SelectedDisease"));
    }
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

    const formatSummary = (summary) => {
        if (!summary) return [];

        const regex = /(What[^?]*\?)/g; // Match "What...?" questions
        const parts = summary.split(regex).filter(part => part.trim() !== "");

        let formattedSections = [];
        let currentHeader = null;
        
        parts.forEach((part) => {
            if (part.startsWith("What")) {
                currentHeader = part.trim();
                formattedSections.push({ header: currentHeader, content: "" });
            } else if (currentHeader) {
                formattedSections[formattedSections.length - 1].content += part.trim() + " ";
            }
        });

        return formattedSections;
    };

    const formattedSummary = formatSummary(disease.patient_summary);

    const cleanFunctionText = (text) => {
        return text.replace(/\s*\([^)]*\)/g, ""); // Removes "(...)" including spaces before
    };

    if (!disease) {
        return <Typography variant="h6" color="error">Disease not found.</Typography>;
    }

    return (
        <Box sx={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
            {notification && <Alert severity="info">{notification}</Alert>}

            {/* Disease Name & Save Button */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #ccc", paddingBottom: "10px", marginBottom: "20px" }}>
                <Typography variant="h4">{disease.disease_name}</Typography>
                <Button variant="contained" color="primary" onClick={handleClick}>
                    Save for later
                </Button>
            </Box>

            {/* Collapsible Sections */}
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Disease Description</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>{disease.description}</Typography>
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Disease Summary</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {formattedSummary.length > 0 ? (
                        formattedSummary.map((section, index) => (
                            <Box key={index} sx={{ marginBottom: "15px" }}>
                                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                                    {section.header}
                                </Typography>
                                <Typography>{section.content.trim()}</Typography>
                            </Box>
                        ))
                    ) : (
                        <Typography>No summary available.</Typography>
                    )}
                </AccordionDetails>
            </Accordion>

            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Deeper Understanding</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {Array.isArray(disease.associated_proteins) && disease.associated_proteins.length > 0 ? (
                        disease.associated_proteins.map((protein, index) => (
                            <Box key={index} sx={{ border: "1px solid #ddd", borderRadius: "8px", padding: "10px", marginBottom: "10px" }}>
                                <Typography variant="subtitle1"><strong>{protein.name}</strong> (Accession ID: {protein.accession_id})</Typography>
                                <ul>
                                    {protein.function
                                        ?.split(". ")
                                        .filter(sentence => sentence.trim() !== "")
                                        .map((sentence, idx) => (
                                            <li key={idx}>{cleanFunctionText(sentence)}.</li>
                                        ))}
                                </ul>
                            </Box>
                        ))
                    ) : (
                        <Typography>No associated proteins found.</Typography>
                    )}
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}