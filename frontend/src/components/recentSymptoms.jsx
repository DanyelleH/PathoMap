import { List, ListItemButton, ListItemText, IconButton, Typography, Box } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { removeSavedDiseases, getSavedDiseases, deleteDiagnosisInfo } from '../api/usersAPI';

const RecentSymptoms = ({ results, setSavedSymptomList, handleOpenSymptomDialog }) => {
  const navigate = useNavigate();

  if (!results || results.length === 0) {
    return <Typography variant="body1" color="textSecondary">No saved symptoms found.</Typography>;
  }

  // const handleResultClick = (disease) => {
  //   localStorage.setItem("SelectedDisease", JSON.stringify(disease));
  //   navigate(`/diseaseInformation/${disease}`);
  // };

  const handleDelete = async (symptom) => {
    try {
      const savedSymptoms = JSON.parse(localStorage.getItem("userProfile")).saved_symptoms || [];
      const updatedSymptoms = savedSymptoms.filter((item) => item.summary !== symptom.summary);
      console.log(symptom.summary)

      const userProfile = JSON.parse(localStorage.getItem("userProfile"));
      userProfile.saved_symptoms = updatedSymptoms;
      localStorage.setItem("userProfile", JSON.stringify(userProfile));

      const username = localStorage.getItem("username");
      const userToken = localStorage.getItem("userToken");
      const context = {"summary": symptom.summary}

      await deleteDiagnosisInfo(username, userToken, context);
      const data = await getSavedDiseases(username, userToken);
      setSavedSymptomList(data || []);
    } catch (error) {
      console.error("Error deleting disease:", error.message);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>

      <Box sx={{ maxHeight: 300, overflowY: 'auto', borderRadius: 2, padding: 1 }}>
        <List disablePadding>
          {results.map((item, index) => (
            <ListItemButton
              key={index}
              onClick={() => handleOpenSymptomDialog(item)}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                backgroundColor: "#f5f5f5",
                borderRadius: 2,
                marginBottom: 1,
                padding: 2,
                backgroundColor: "#C6CAED",
                '&:hover': {
                  backgroundColor: "#FFDDD2",
                  transform: 'scale(1.02)',
                },
              }}
            >
              <ListItemText 
                primary={item.summary || `Item ${index + 1}`}
                sx={{ fontWeight: 'medium', color: "#333" }}
              />
              <IconButton
                onClick={(e) => { e.stopPropagation(); handleDelete(item); }}
                edge="end"
                sx={{
                  color: "#d32f2f",
                  '&:hover': {
                    backgroundColor: "#ffebee",
                  },
                }}
              >
                <HighlightOffIcon />
              </IconButton>
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default RecentSymptoms;