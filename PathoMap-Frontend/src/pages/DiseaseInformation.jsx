import React from "react";
import { useParams } from "react-router-dom";
import { saveDiseaseInfo } from "../api/usersAPI";
import { useState } from "react";
import { Box, Button, Accordion, AccordionSummary, AccordionDetails, Typography, Alert } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function DiseaseInformation() {
    const { diseasePk } = useParams();
    const [notification, setNotification] = useState("");
    const diseases = JSON.parse(localStorage.getItem("DiseaseSearch")) || [];
    
    let disease = diseases.find((d) => d.pk.toString() === diseasePk);
    if (!disease) {
        disease = JSON.parse(localStorage.getItem("SelectedDisease"));
    }

    const handleClick = async (e) => {
        e.preventDefault();
        const userToken = localStorage.getItem("userToken");
        const username = localStorage.getItem("username");

        const context = { disease_name: disease.disease_name };
        const response = await saveDiseaseInfo(username, userToken, context);
        console.log(response);
        if (response.error) {
            setNotification(response.error);
        } else {
            setNotification(response);
        }
    };

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
        <Box sx={{ maxWidth: "800px", margin: "auto", padding: "20px", fontFamily: '"Roboto", sans-serif' }}>
    {/* Notification Section */}
    {notification && (
        <Alert severity={notification.error ? "error" : "info"} sx={{ marginBottom: "20px", backgroundColor: notification.error ? "#f8d7da" : "#d1ecf1", color: notification.error ? "#721c24" : "#0c5460" }}>
            {notification.error ? "Error: " : "Success: "}
            {notification.message || notification}
        </Alert>
    )}

    {/* Disease Header and Save Button */}
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: "20px" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", marginBottom: "10px", color: "#2c3e50" }}>
            {disease.disease_name}
        </Typography>
        <Button 
            variant="contained" 
            color="primary" 
            sx={{ padding: "10px 20px", fontSize: "16px", backgroundColor: "#2980b9", "&:hover": { backgroundColor: "#1c638d" } }} 
            onClick={handleClick}>
            Save for later
        </Button>
    </Box>

    {/* Disease Summary Accordion */}
    <Accordion sx={{ marginBottom: "20px" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#34495e" }}>Summary</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ maxHeight: "300px", overflowY: "auto", backgroundColor: "#f9fafb" }}>
            {formattedSummary.length > 0 ? (
                formattedSummary.map((section, index) => (
                    <Box key={index} sx={{ marginBottom: "15px" }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                            {section.header}
                        </Typography>
                        <Typography variant="body2">{section.content.trim()}</Typography>
                    </Box>
                ))
            ) : (
                <Typography>No summary available.</Typography>
            )}
        </AccordionDetails>
    </Accordion>

    {/* Disease Description Accordion */}
    <Accordion sx={{ marginBottom: "20px" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#34495e" }}>High Level Description</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ maxHeight: "300px", overflowY: "auto", backgroundColor: "#f9fafb" }}>
            <Typography variant="body1">{disease.description}</Typography>
        </AccordionDetails>
    </Accordion>

    {/* Associated Proteins Accordion */}
    <Accordion sx={{ marginBottom: "20px" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#34495e" }}>Protein Association</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ maxHeight: "300px", overflowY: "auto", backgroundColor: "#f9fafb" }}>
            {Array.isArray(disease.associated_proteins) && disease.associated_proteins.length > 0 ? (
                disease.associated_proteins.map((protein, index) => (
                    <Box key={index} sx={{ border: "1px solid #ddd", borderRadius: "8px", padding: "10px", marginBottom: "10px", backgroundColor: "#f1f1f1" }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                            <strong>{protein.name}</strong> (Accession ID: {protein.accession_id})
                        </Typography>
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