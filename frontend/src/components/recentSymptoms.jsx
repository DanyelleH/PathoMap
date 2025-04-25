import { List, ListItemButton, ListItemText, IconButton, Typography, Box } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const RecentSymptoms = ({ symptoms, setSymptomsList }) => {
  const navigate = useNavigate();

  if (!symptoms || symptoms.length === 0) {
    return <Typography variant="body1" color="textSecondary">No recent symptoms recorded.</Typography>;
  }

  const handleResultClick = (symptom) => {
    // You can link to a detailed page if needed
    localStorage.setItem("SelectedSymptom", JSON.stringify(symptom));
    navigate(`/symptomInformation/${symptom}`);
  };

  const handleDelete = async (symptom) => {
    try {
      const currentSymptoms = JSON.parse(localStorage.getItem("userProfile")).recent_symptoms || [];
      const updatedSymptoms = currentSymptoms.filter((item) => item.id !== symptom.id);

      const userProfile = JSON.parse(localStorage.getItem("userProfile"));
      userProfile.recent_symptoms = updatedSymptoms;
      localStorage.setItem("userProfile", JSON.stringify(userProfile));

      setSymptomsList(updatedSymptoms);
    } catch (error) {
      console.error("Error deleting symptom:", error.message);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Box sx={{ maxHeight: 300, overflowY: 'auto', borderRadius: 8, padding: 1 }}>
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
                backgroundColor: "#E3F2FD",
                borderRadius: 2,
                marginBottom: 1,
                padding: 2,
                '&:hover': {
                  backgroundColor: "#FFEB3B",
                  transform: 'scale(1.02)',
                },
              }}
            >
              <ListItemText
                primary={item.symptom_description || `Symptom ${index + 1}`}
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