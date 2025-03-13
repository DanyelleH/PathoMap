import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import { 
  Box, Divider, Typography, Card, CardContent, Button, Container} from "@mui/material";
import { analyzeSymptoms } from "../api/SymptomsAPI";
import { CheckCircle, Warning, ErrorOutline } from "@mui/icons-material"; 
import CircularColor from "../components/LoadingComponent";

export default function SymptomSearch() {
  const searchPrompt = "What's bothering you?";
  const [results, setResults] = useState(JSON.parse(localStorage.getItem("Diagnosis")) || {});
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("userToken");

  const handleSearch = async (complaint) => {
    setIsLoading(true);
    try {
      const context = { symptoms: complaint };
      const diagnosis = await analyzeSymptoms(token, context);
      if (diagnosis) {
        setResults(diagnosis);
        localStorage.setItem("Diagnosis", JSON.stringify(diagnosis));
      }
    } catch (error) {
      console.error("Error fetching diagnosis", error);
      setResults({});
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSearch = () => {
    localStorage.setItem("SavedDiagnosis", JSON.stringify(results));
    alert("Search saved successfully!");
  };

  const getLikelihoodIcon = (likelihood) => {
    switch (likelihood.toLowerCase()) {
      case "high":
        return <ErrorOutline sx={{ color: "red", marginRight: 1 }} />;
      case "medium":
        return <Warning sx={{ color: "orange", marginRight: 1 }} />;
      case "low":
        return <CheckCircle sx={{ color: "green", marginRight: 1 }} />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md">
      <Box 
        sx={{ 
          background: "linear-gradient(to right, #6a11cb, #2575fc)", 
          color: "white", 
          textAlign: "center", 
          padding: 4, 
          borderRadius: 2,
          boxShadow: 3
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          AI Symptom Analyzer
        </Typography>
        <Typography variant="subtitle1" mt={1} fontStyle="italic">
          Enter your symptoms below to get a possible diagnosis.
        </Typography>
      </Box>

      {/* Search Bar */}
      <Box mt={3}>
        <SearchBar searchPrompt={searchPrompt} onSearch={handleSearch} />
      </Box>

      <Divider sx={{ marginY: 4, borderColor: "#2575fc" }} />

      {/* Loading Spinner */}
      {isLoading ? (
        <Box textAlign="center" mt={5}>
          <CircularColor />
        </Box>
      ) : (
        <Box>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Potential Diagnoses Based on Your Symptoms
          </Typography>

          {/* Summary */}
          {results.summary && (
            <Typography variant="body1" mb={2} sx={{ fontStyle: "italic" }}>
              {results.summary}
            </Typography>
          )}

          {/* Conditions List */}
          {results.conditions && results.conditions.length > 0 ? (
            results.conditions.map((condition, index) => (
              <Card 
                key={index} 
                sx={{ 
                  marginBottom: 2, 
                  padding: 2, 
                  boxShadow: 3, 
                  transition: "0.3s", 
                  "&:hover": { boxShadow: 6, transform: "scale(1.02)" } 
                }}
              >
                <CardContent>
                  <Typography variant="h6" display="flex" alignItems="center">
                    {getLikelihoodIcon(condition.likelihood)}
                    {condition.name} ({condition.likelihood})
                  </Typography>
                  <Typography variant="body2">{condition.description}</Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              No conditions found.
            </Typography>
          )}

          {/* Recommendations */}
          {results.recommendations && (
            <Typography variant="body1" mt={2}>
              <strong>Recommendations:</strong> {results.recommendations}
            </Typography>
          )}

          {/* Save Search Button */}
          <Box textAlign="center" mt={3}>
            <Button variant="contained" color="primary" onClick={handleSaveSearch}>
              Save Search
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
}