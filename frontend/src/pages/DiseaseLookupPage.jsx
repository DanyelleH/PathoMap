import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { getDiseases } from "../api/DiseaseAPI";
import Results from "../components/ResultsComponent";
import { Box, Divider, Typography, Button, Container, Paper, Alert, CircularProgress } from "@mui/material";
import { useTheme } from "../contexts/themeContext";

export default function DiseaseLookup() {
  const [results, setDiseaseResults] = useState(
    JSON.parse(localStorage.getItem("DiseaseSearch")) || []
  );
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const searchPrompt = "Enter Disease Name";
  const token = localStorage.getItem("userToken");

  const handleSearch = async (disease_name) => {
    setIsLoading(true);
    try {
      const disease = await getDiseases(token, disease_name);
      if (disease?.detail?.trim() === "Invalid token.") {
        setDiseaseResults([]);
        setError("You must be logged in to perform a search");
        return;
      }
      if (disease.detail !== "Disease not found") {
        setDiseaseResults(disease);
        localStorage.setItem("DiseaseSearch", JSON.stringify(disease));
      } else {
        setError(`${disease_name} not found, try performing a different search`);
      }
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
    <>
      <Typography variant="h4" fontWeight="bold" sx={{ marginBottom: 3 }}>
        Explore Diseases by Name
      </Typography>
      <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Paper
          elevation={3}
          sx={{
            background: "#56159d",
            color: "white",
            textAlign: "left",
            padding: 3,
            borderRadius: 3,
            boxShadow: 3,
            width: "100%",
            marginBottom: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="inherit" fontStyle="italic" sx={{ marginBottom: 1 }}>
            Enter a disease name to find detailed information.
          </Typography>
          <Typography variant="subtitle2">
            🧬 Note: This tool only supports diseases with known human protein associations. Some infectious diseases may not return results.
          </Typography>
          <SearchBar onSearch={handleSearch} searchPrompt={searchPrompt} sx={{ marginTop: 2 }} />
        </Paper>

        <Divider sx={{ width: "100%", marginBottom: 3, backgroundColor: "#616161" }} />

        <Paper
          elevation={3}
          sx={{
            padding: 3,
            borderRadius: 3,
            width: "100%",
            boxShadow: "0px 6px 20px rgba(10, 10, 10, 0.3)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: theme === "dark" ? "#2E2E2E" : "#f9f9f9",
          }}
        >
          <Box sx={{ width: "100%", textAlign: "left", marginBottom: 2 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ color: theme === "dark" ? "#ffffff" : "#000000" }}>
              Search Results
            </Typography>
          </Box>

          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <CircularProgress color="primary" sx={{ marginRight: 2 }} />
              <Typography variant="body1" sx={{ color: "#1976d2" }}>
                Loading...
              </Typography>
            </Box>
          ) : (
            <>
              {error && <Alert severity="error">{error}</Alert>}
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
                      backgroundColor: "#B6465F",
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
    </>
  );
}