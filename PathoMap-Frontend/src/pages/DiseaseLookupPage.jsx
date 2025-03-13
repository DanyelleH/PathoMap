import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { getDiseases } from "../api/DiseaseAPI";
import Results from "../components/ResultsComponent";
import { Box, Divider, Typography, Button, Container, Paper} from "@mui/material";
import CircularColor from "../components/LoadingComponent";

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
    <Container maxWidth="md">
      <Box
        sx={{
          background: "linear-gradient(to right, #6a11cb, #2575fc)",
          color: "white",
          textAlign: "center",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          marginBottom: 3,
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Explore Diseases by Name
        </Typography>
        <Typography variant="subtitle1" mt={1} fontStyle="italic">
          Enter a disease name to find detailed information.
        </Typography>
      </Box>

      {/* Search Bar */}
      <Box display="flex" justifyContent="center" mb={3} sx={{ width: '100%' }}>
        <SearchBar onSearch={handleSearch} searchPrompt={searchPrompt} />
      </Box>

      <Divider sx={{ marginBottom: 3, backgroundColor: '#2575fc' }} />

      {/* Results Section */}
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          borderRadius: 2,
          width: "100%",
          boxShadow: "0px 6px 20px rgba(10, 10, 10, 0.3)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CircularColor />
            <Typography variant="body1" sx={{ color: "#1976d2", marginLeft: 2 }}>Loading...</Typography>
          </Box>
        ) : (
          <>
            {/* Center the Results component */}
            <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
              <Results results={results} onClick={handleResultClick} />
            </Box>

            {results.length > 0 && (
              <Box display="flex" justifyContent="center" mt={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setDiseaseResults([])}
                  sx={{
                    "&:hover": { transform: "scale(1.05)", backgroundColor: "#E57373" },
                    borderRadius: 2,
                    backgroundColor: "#1976d2",
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