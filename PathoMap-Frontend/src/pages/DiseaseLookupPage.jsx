import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { getDiseases } from "../api/DiseaseAPI";
import Results from "../components/ResultsComponent";
import { Box, Divider, Typography, Button, Container, Paper } from "@mui/material";

export default function DiseaseLookup() {
  const [results, setDiseaseResults] = useState(
    JSON.parse(localStorage.getItem("DiseaseSearch")) || []
  );
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const searchPrompt = "Enter Disease Name";
  const token = localStorage.getItem("userToken");

  const handleSearch = async (disease_name) => {
    setIsLoading(true);
    try {
      const disease = await getDiseases(token, disease_name);
      if (disease.detail !== "Disease not found") {
        setDiseaseResults(disease);
      }
      localStorage.setItem("DiseaseSearch", JSON.stringify(disease));
    } catch (error) {
      console.error("Error fetching diseases:", error);
      setDiseaseResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResultClick = (disease_pk) => {
    navigate(`/diseaseInformation/${disease_pk}`);
  };

  return (
    <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3 }}>
      {/* Page Title */}
      <Typography variant="h3" sx={{ fontWeight: 'bold', marginBottom: 3, textAlign: 'center' }}>
        Disease Search
      </Typography>

      {/* Search Bar */}
      <Box display="flex" justifyContent="center" mb={3} sx={{ width: '100%' }}>
        <SearchBar onSearch={handleSearch} searchPrompt={searchPrompt} />
      </Box>

      <Divider sx={{ marginBottom: 3 }} />

      {/* Results Section */}
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, width: '100%' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          Search Results:
        </Typography>

        {isLoading ? (
          <Typography variant="body1">Loading...</Typography>
        ) : (
          <>
            <Results results={results} onClick={handleResultClick} />
            {results.length > 0 && (
              <Box display="flex" justifyContent="center" mt={2}>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  onClick={() => setDiseaseResults([])}
                  sx={{
                    '&:hover': { transform: 'scale(1.05)' },
                    borderRadius: 2,
                  }}
                >
                  Clear Results
                </Button>
              </Box>
            )}
          </>
        )}
      </Paper>
    </Container>
  );
}