import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import { 
  Box, Divider, Typography, Card, CardContent, Button, Container, Alert, Paper, Chip} from "@mui/material";
import { analyzeSymptoms } from "../api/SymptomsAPI";
import CircularColor from "../components/LoadingComponent";
import { saveDiagnosisInfo } from "../api/usersAPI";
import { useTheme } from "../contexts/themeContext";
export default function SymptomSearch() {
  const searchPrompt = "What's bothering you? 🤕";
  const [results, setResults] = useState(JSON.parse(localStorage.getItem("Diagnosis")) || {});
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem("userToken");
  const { theme } = useTheme();

  const handleSearch = async (complaint) => { 
  setIsLoading(true);
  setErrorMessage("");

  try {
    const context = { symptoms: complaint };
    let diagnosis = await analyzeSymptoms(token, context);

    // 🔽 If diagnosis is a string, clean and parse it
    if (typeof diagnosis === "string") {
      // Remove triple backticks and optional 'json' label
      diagnosis = diagnosis.replace(/```json|```/g, "").trim();

      try {
        diagnosis = JSON.parse(diagnosis);
      } catch (parseError) {
        console.error("Failed to parse cleaned diagnosis:", parseError);
        setErrorMessage("There was an error reading the diagnosis result.");
        setIsLoading(false);
        return;
      }
    }

    if (diagnosis?.detail?.trim() === "Invalid token.") {
      setResults([]);
      setErrorMessage("You must be logged in to perform symptom analysis");
      return;
    }

    if (diagnosis) {
      setResults(diagnosis);
      localStorage.setItem("Diagnosis", JSON.stringify(diagnosis));
      handleSaveSearch(diagnosis);
    }

  } catch (error) {
    console.error("Error fetching diagnosis", error);
    setResults({});
    setErrorMessage("Something went wrong while analyzing symptoms.");
  } finally {
    setIsLoading(false);
  }
};

  const handleSaveSearch = async (diagnosis) => {
    const userToken = localStorage.getItem("userToken");
    const username = localStorage.getItem("username");

    const context = { symptom_analysis: diagnosis };
    const response = await saveDiagnosisInfo(username, userToken, context);
    if (response.error) {
      setNotification(response.error);
    } else {
      setNotification(response);
    }
  };

  const getLikelihoodIcon = (likelihood) => {
    switch (likelihood.toLowerCase()) {
      case "high":
        return "✅ ";
      case "medium":
        return "⚠️ ";
      case "low":
        return "❓ ";
      default:
        return "❓";
    }
  };

  return (
    <>
      <Typography variant="h4" fontWeight="bold" sx={{ marginBottom: 3, textAlign: 'center' }}>
        AI Symptom Analyzer
      </Typography>
      <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Paper
          elevation={3}
          sx={{
            background: "#56159d",
            color: "white",
            textAlign: "left",
            padding: 3,
            borderRadius: 2,
            boxShadow: 3,
            width: "100%",
            marginBottom: 3,
          }}
        >
          <Typography variant="inherit" fontStyle="italic" sx={{ marginBottom: 2 }}>
            Enter your symptoms below to get a possible diagnosis.
            <Typography variant="subtitle2" sx={{ fontStyle: "normal", marginTop: 1 }}>
              ‼️ Tip: Include how long you’ve had them, their severity, and anything else that might help (e.g. travel, meds, or conditions).
            </Typography>
          </Typography>
          <SearchBar searchPrompt={searchPrompt} onSearch={handleSearch} />
        </Paper>

        {/* Loading Spinner */}
        {isLoading ? (
          <Box textAlign="center" mt={5}>
            <CircularColor />
          </Box>
        ) : (
          <Box sx={{ width: "100%" }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Potential Diagnoses Based on Your Symptoms
            </Typography>
            {errorMessage && <Alert severity="error" sx={{ marginBottom: 2 }}>{errorMessage}</Alert>}
            {notification && (
              <Alert severity={notification.error ? "error" : "info"} sx={{ marginBottom: 2 }}>
                {notification.error ? "Error: " : "Success: "} {notification.message || notification}
              </Alert>
            )}

            {/* Summary */}
            {results.summary && (
              <Typography variant="body1" mb={2} sx={{ fontStyle: "italic" }}>
                Reported Symptoms 📝 : {results.summary}
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
                    backgroundColor: theme === 'dark' ? "#FFDDD2" : "#FFFFFF",
                    "&:hover": { boxShadow: 9, transform: "scale(1.08)" },
                  }}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                      <Typography variant="h5" fontWeight="bold" display="flex" alignItems="center">
                        {getLikelihoodIcon(condition.likelihood)}
                        {condition.name}
                      </Typography>
                      <Chip label={`Likelihood: ${condition.likelihood}`} color="primary" variant="outlined" size="small" />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Description: {condition.description} <br></br>
                      Advice: {condition.Advice}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography variant="body2">
                Potential Differentials will appear here.
              </Typography>
            )}

            {/* Recommendations */}
            {results.recommendations && (
              <Typography variant="body1" mt={2}>
                <strong>Recommendations:</strong> {results.recommendations}
              </Typography>
            )}

            {/* Save Search Button - Only visible if results.conditions are present
            {results.conditions && results.conditions.length > 0 && (
              <Box textAlign="center" mt={3}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveSearch}
                  sx={{
                    backgroundColor: "#57A773",
                    "&:hover": { backgroundColor: "#90C290" },
                    fontSize: "14px",
                    padding: "10px 20px",
                  }}
                >
                  Save Search
                </Button>
              </Box>
            )} */}
          </Box>
        )}

        <Box mt={4} mb={2}>
          <Paper elevation={1} sx={{ padding: 2, backgroundColor: "#f9f9f9", borderLeft: "6px solid #B6465F" }}>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              ⚠️ Symbol Key
            </Typography>
            <Typography variant="body2">
              ✅ <strong>Commonly Associated</strong>: This condition is often linked with your reported symptoms.
            </Typography>
            <Typography variant="body2">
              ⚠️ <strong>Possible Explanation</strong>: This condition may explain your symptoms.
            </Typography>
            <Typography variant="body2">
              ❓ <strong>Less Likely</strong>: This condition is less likely but still possible.
            </Typography>
            <Typography variant="caption" color="text.secondary" display="block" mt={1}>
              Disclaimer: This tool does not replace professional medical advice. Please consult a healthcare provider for a proper diagnosis.
            </Typography>
          </Paper>
        </Box>
      </Container>
    </>
  );
}