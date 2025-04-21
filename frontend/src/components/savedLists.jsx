import { List, ListItemButton, ListItemText, IconButton, Typography, Box } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Delete as DeleteIcon } from '@mui/icons-material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { removeSavedDiseases, getSavedDiseases } from '../api/usersAPI';

const SavedList = ({ results, setSavedList }) => {
  const navigate = useNavigate();

  if (!results || results.length === 0) {
    return <Typography variant="body1" color="textSecondary">No saved diseases found.</Typography>;
  }

  const handleResultClick = (disease) => {
    localStorage.setItem("SelectedDisease", JSON.stringify(disease));
    navigate(`/diseaseInformation/${disease}`);
  };

  const handleDelete = async (disease) => {
    try {
      const savedDiseases = JSON.parse(localStorage.getItem("userProfile")).current_readings || [];
      const updatedDiseases = savedDiseases.filter((item) => item.pk !== disease.pk);

      const userProfile = JSON.parse(localStorage.getItem("userProfile"));
      userProfile.current_readings = updatedDiseases;
      localStorage.setItem("userProfile", JSON.stringify(userProfile));

      const username = localStorage.getItem("username");
      const userToken = localStorage.getItem("userToken");

      await removeSavedDiseases(username, userToken, disease.disease_name);
      const data = await getSavedDiseases(username, userToken);
      setSavedList(data || []);
    } catch (error) {
      console.error("Error deleting disease:", error.message);
    }
  };

  return (
    // saved disease searches list 
    <Box sx={{ padding: 3 }}>

      <Box sx={{ maxHeight: 300, overflowY: 'auto', borderRadius: 2, padding: 1 }}>
        <List disablePadding>
          {results.map((item, index) => (
            <ListItemButton
              key={index}
              onClick={() => handleResultClick(item)}
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
                primary={item.disease_name || `Item ${index + 1}`}
                sx={{ fontWeight: 'medium', color: "#333" }}
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

export default SavedList;