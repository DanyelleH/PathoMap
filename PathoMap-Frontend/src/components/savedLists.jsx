import { List, ListItemButton, ListItemText, IconButton } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { removeSavedDiseases } from "../api/usersAPI";
import { getSavedDiseases } from '../api/usersAPI';
const SavedList = ({results, setSavedList}) => {
  const navigate = useNavigate()

  if (!results || results.length === 0) {
    return <p>No saved diseases found.</p>;
  }
  const handleResultClick = (disease) => {
    console.log(disease);
    localStorage.setItem("SelectedDisease", JSON.stringify(disease));
    navigate(`/diseaseInformation/${disease}`);

  };

  const handleDelete = async (disease) => {
    try {
      // get items from local storage where the pk is not what we are looking for.
       const savedDiseases = JSON.parse(localStorage.getItem("userProfile")).current_readings || [];
       const updatedDiseases = savedDiseases.filter((item) => item.pk !== disease.pk);
   
       // Set current readings to the udatedList,
       const userProfile = JSON.parse(localStorage.getItem("userProfile"));
       userProfile.current_readings = updatedDiseases;
       localStorage.setItem("userProfile", JSON.stringify(userProfile));
      // Assuming you have the username and userToken stored somewhere (e.g., in local storage)
      const username = localStorage.getItem("username");
      const userToken = localStorage.getItem("userToken");
     // Call the backend API to remove the disease from the saved list
     const response = await removeSavedDiseases(username, userToken, disease.disease_name);
     console.log(response); // Log the response or update the UI accordingly
     
     const data = await getSavedDiseases(username, userToken);
     setSavedList(data || []);
   } catch (error) {
     console.error("Error deleting disease:", error.message); // Handle any errors
   }
 
     //update the backend.
    // Update the state of the saved diseases
 
   };
  return (
    <>
      <p>Saved Disease Searches</p>
      {results.map((item, index) => (
        <List key={index} disablePadding>
          <ListItemButton
            onClick={() => handleResultClick(item)}
            sx={{ display: 'flex', justifyContent: 'space-between' }} // Use flex to align the button and text
          >
            <ListItemText primary={item.disease_name || `Item ${index + 1}`} />
            <IconButton onClick={(e) => {e.stopPropagation(); handleDelete(item);}} edge="end">
              <DeleteIcon />
            </IconButton>
          </ListItemButton>
        </List>
      ))}
    </>
  );
};

export default SavedList