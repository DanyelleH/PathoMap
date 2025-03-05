import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import { getDiseases } from "../api/DiseaseAPI";
import Results from "../components/ResultsComponent";
import { Box, Divider, Typography } from "@mui/material";

export default function DiseaseLookup() {
  const [results, setDiseaseResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchPrompt = "Enter Disease Name";

  const handleSearch = async (disease_name) => {
    console.log(disease_name);
    setIsLoading(true);
    try {
      const token = localStorage.getItem("userToken");
      const disease = await getDiseases(token, disease_name);
      setDiseaseResults(disease);
    } catch (error) {
      console.error("Error fetching diseases:", error);
      setDiseaseResults([]); // Clear results if there’s an error
    } finally {
      setIsLoading(false); // Set loading to false once the request is done
    }
  };

  return (
    <>
      {/* Title */}
      <Typography variant="h6" align="center" mb={3}>
        Disease Lookup
      </Typography>

      {/* Search Bar */}
      <Box mb={3}>
        <SearchBar onSearch={handleSearch} searchPrompt={searchPrompt} />
      </Box>

      {/* Divider */}
      <Divider sx={{ marginBottom: 3 }} />

      {/* Results Section */}
      <Box border={1} borderColor="grey.300" padding={2}>
        <Typography variant="h6" gutterBottom>
          Results List
        </Typography>
        {/* Show loading message or Results component */}
        {isLoading ? (
          <Typography variant="body1">Loading...</Typography>
        ) : (
          <Results results={results} />
        )}
      </Box>
    </>
  );
}