import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, Collapse } from "@mui/material";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import BiotechIcon from '@mui/icons-material/Biotech';;
import { saveDiseaseInfo } from "../api/usersAPI";
import {
    Box, Button, Accordion, AccordionSummary, AccordionDetails,
    Typography, Alert, Divider
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function DiseaseInformation() {
    const { diseasePk } = useParams();
    const [notification, setNotification] = useState("");
    const [expandedIndexes, setExpandedIndexes] = useState([]);
    const [expandedProteins, setExpandedProteins] = useState([]);

    const toggleCard = (index) => {
        setExpandedIndexes((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
        );
    };
    const toggleProteinCard = (index) => {
        setExpandedProteins((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
        );
    };

    const diseases = JSON.parse(localStorage.getItem("DiseaseSearch")) || [];
    let disease = diseases.find((d) => d.pk.toString() === diseasePk) || 
                  JSON.parse(localStorage.getItem("SelectedDisease"));

    const handleClick = async (e) => {
        e.preventDefault();
        const userToken = localStorage.getItem("userToken");
        const username = localStorage.getItem("username");

        const response = await saveDiseaseInfo(username, userToken, {
            disease_name: disease.disease_name
        });

        setNotification(response.error ? response.error : response);
    };

    const formatSummary = (summary) => {
        if (!summary) return [];
        const regex = /(What[^?]*\?)/g;
        const parts = summary.split(regex).filter(p => p.trim() !== "");

        let formatted = [];
        let currentHeader = null;

        parts.forEach(part => {
            if (part.startsWith("What")) {
                currentHeader = part.trim();
                formatted.push({ header: currentHeader, content: "" });
            } else if (currentHeader) {
                formatted[formatted.length - 1].content += part.trim() + " ";
            }
        });

        return formatted;
    };

    const cleanFunctionText = (text) => text.replace(/\s*\([^)]*\)/g, "");

    const formattedSummary = formatSummary(disease?.patient_summary);

    if (!disease) {
        return <Typography variant="h6" color="error">Disease not found.</Typography>;
    }

    return (
        <Box sx={{ maxWidth: "900px", margin: "auto", p: 3, fontFamily: "Roboto, sans-serif" }}>
            {/* Disease Title */}
            <Box sx={{ mb: 2 }}>
                <Typography variant="h3" fontWeight="bold" gutterBottom>
                    {disease.disease_name}
                </Typography>
                <Typography variant="body1" >
                    {disease.description}
                </Typography>
            </Box>

            {/* Save Button */}
            <Box sx={{ textAlign: "right", mb: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                    sx={{
                        backgroundColor: "#6A11CB",
                        "&:hover": { backgroundColor: "#8f1ed9" },
                        fontSize: "14px",
                        padding: "10px 20px"
                    }}
                >
                    💾 Save for Later
                </Button>
            </Box>

            {/* Notification */}
            {notification && (
                <Alert
                    severity={notification.error ? "error" : "info"}
                    sx={{ mb: 3 }}
                >
                    {notification.error ? "Error: " : "Success: "}
                    {notification.message || notification}
                </Alert>
            )}

            <Divider sx={{ mb: 3 }} />

            {/* Summary Section */}
            <AccordionDetails sx={{ backgroundColor: "#C6CAED" }}>
                <Typography sx={{color:"black",mb:1, fontWeight:"bold"}}>Disease Information</Typography>
                {formattedSummary.length > 0 ? (
                    formattedSummary.map((section, i) => (
                <Box key={i} sx={{ mb: 2 }}>
                    <Card
                    variant="outlined"
                    sx={{ backgroundColor: "#ffffff", borderRadius: 2, boxShadow: 1 }}
                    >
                        <CardContent
                            onClick={() => toggleCard(i)}
                            sx={{
                                cursor: "pointer",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}
                            >
                            <Typography variant="subtitle1" fontWeight="bold">
                                {section.header}
                            </Typography>
                            <ExpandMoreIcon
                                sx={{
                                    transform: expandedIndexes.includes(i) ? "rotate(180deg)" : "rotate(0deg)",
                                    transition: "transform 0.3s ease"
                                }}
                            />
                        </CardContent>

                        <Collapse in={expandedIndexes.includes(i)} timeout="auto" unmountOnExit>
                            <CardContent sx={{ pt: 0 }}>
                                <Typography variant="body2">
                                    {section.content.trim()}
                                </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>
                </Box>))
                ) : (
                <Typography sx={{color:"black"}} >No additional information available for this condition.</Typography>
                )}
            </AccordionDetails>

            {/* Protein Section */}
            <Accordion sx={{ mt: 2, backgroundColor:"#C6CAED" }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" fontWeight="bold">🧬 Associated Proteins</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ backgroundColor: "#f5f7fa" }}>
                {Array.isArray(disease.associated_proteins) && disease.associated_proteins.length > 0 ? (
                    disease.associated_proteins.map((protein, i) => (
                    <Box key={i} sx={{ mb: 2 }}>
                        <Card
                            variant="outlined"
                            sx={{ backgroundColor: "#ffffff", borderRadius: 2, boxShadow: 1 }}
                            >
                            <CardContent
                                    onClick={() => toggleProteinCard(i)}
                                    sx={{
                                        cursor: "pointer",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                    }}
                            >
                                <Box>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        {protein.name}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Accession ID: {protein.accession_id}
                                    </Typography>
                                </Box>
                                <ExpandMoreIcon
                                    sx={{
                                        transform: expandedProteins.includes(i) ? "rotate(180deg)" : "rotate(0deg)",
                                        transition: "transform 0.3s ease"
                                    }}
                                />
                            </CardContent>

                            <Collapse in={expandedProteins.includes(i)} timeout="auto" unmountOnExit>
                                <CardContent sx={{ pt: 1 }}>
                                    <Box
                                    sx={{
                                        maxHeight: 200,
                                        overflowY: "auto",
                                        pr: 1,
                                        "&::-webkit-scrollbar": {
                                        width: "0.4em"
                                        },
                                        "&::-webkit-scrollbar-thumb": {
                                        backgroundColor: "#c1c1c1",
                                        borderRadius: "8px"
                                        }
                                    }}
                                    >
                                    <List dense>
                                        {protein.function?.split(". ")
                                        .filter(text => text.trim())
                                        .map((sentence, j) => (
                                            <ListItem
                                            key={j}
                                            alignItems="flex-start"
                                            disableGutters
                                            sx={{ pl: 1.5 }}
                                            >
                                            <ListItemIcon sx={{ minWidth: 28 }}>
                                                <BiotechIcon fontSize="small" color="action" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={cleanFunctionText(sentence) + '.'}
                                                typographyProps={{ variant: "body2", color: "text.primary" }}
                                            />
                                            </ListItem>
                                        ))}
                                    </List>
                                    </Box>
                                </CardContent>
                            </Collapse>
                        </Card>
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