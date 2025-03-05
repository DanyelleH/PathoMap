import React from "react";
import Results from "../components/ResultsComponent";
import SearchBar from "../components/SearchBar";
import { Box, Divider, Typography } from "@mui/material";

export default function SymptomSearch() {
  const searchPrompt = "What symptoms are bothering you?";

  return (
    <>
      {/* Title */}
      <Typography variant="h6" align="center" mb={3}>
        Symptom Search
      </Typography>

      {/* Search Bar */}
      <Box mb={3}>
        <SearchBar searchPrompt={searchPrompt} />
      </Box>

      <Divider sx={{ marginBottom: 3 }} />

      {/* Results Section */}
      <Box border={1} borderColor="grey.300" padding={2}>
        <Typography variant="h6" gutterBottom>
          Possible Consitions: 
        </Typography>
        <p> Results render here </p>
      </Box>
    </>
  );
}