import { List, ListItemButton, ListItemText, IconButton, Typography, Box } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { deleteDiagnosisInfo } from '../api/usersAPI';
const RecentSymptoms = ({ symptoms, setSavedSymptomList, handleOpenSymptomDialog, fetchSavedSymptoms }) => {
  const navigate = useNavigate();

  if (!symptoms || symptoms.length === 0) {
    return <Typography variant="body1" color="textSecondary">No recent symptoms recorded.</Typography>;
  }

  const handleResultClick = (symptom) => {
    handleOpenSymptomDialog(symptom);
  };

  const handleDelete = async (symptom) => {
    console.log(symptom.summary)
    const username = localStorage.getItem("username")
    const userToken = localStorage.getItem("userToken")
    const context = {summary: symptom.summary}
    try {
      // const currentSymptoms = JSON.parse(localStorage.getItem("userProfile")).recent_symptoms || [];
      // const updatedSymptoms = currentSymptoms.filter((item) => item.id !== symptom.id);
      const updatedSymptoms = await deleteDiagnosisInfo(username, userToken, context)
      console.log(updatedSymptoms)
      // const userProfile = JSON.parse(localStorage.getItem("userProfile"));
      // userProfile.recent_symptoms = updatedSymptoms;
      // localStorage.setItem("userProfile", JSON.stringify(userProfile));
      
      setSavedSymptomList([]);
    } catch (error) {
      console.error("Error deleting symptom:", error.message);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ maxHeight: 400, overflowY: 'auto', borderRadius: 8, padding: 1 }}>
        <List
          sx={{
            maxHeight: 300,
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(106, 17, 203, 0.5)',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: '#f0f0f0',
            },
          }} 
          disablePadding
        >
          {symptoms.map((item, index) => (
            <ListItemButton
              key={index}
              onClick={() => handleResultClick(item)}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                backgroundColor: "#C6CAED",
                borderRadius: 2,
                marginBottom: 1,
                padding: 2,
                '&:hover': {
                  backgroundColor: "#FFDDD2",
                  transform: 'scale(1.02)',
                },
              }}
            >
              <ListItemText
                primary={item.summary || `Symptom ${index + 1}`}
                sx={{
                  fontWeight: 'medium',
                  color: "#333",
                }}
              />
              <IconButton
                onClick={(e) => { e.stopPropagation(); handleDelete(item); }}
                edge="end"
                sx={{
                  color: "#B6465F",
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