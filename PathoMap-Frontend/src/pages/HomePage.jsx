import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div>
      <Box 
        display="grid" 
        gridTemplateColumns="repeat(2, 1fr)" // Two items per row
        gap={2} 
        padding={2}
        sx={{
          backgroundColor: '#f5f5f5',  // Optional background color
        }}
      >
       
        <Box sx={{ backgroundColor: '#ffffff' }}>
          <Card onClick={() => handleNavigation('/diseaseLookup')} sx={{ cursor: 'pointer' }}>
            <CardContent>
              <Typography variant="h6">Search for a Disease</Typography>
              <Typography variant="body2">Find diseases by name</Typography>
            </CardContent>
          </Card>
        </Box>

     
        <Box sx={{ backgroundColor: '#e0e0e0' }}>
          <Card onClick={() => handleNavigation('/profile')} sx={{ cursor: 'pointer' }}>
            <CardContent>
              <Typography variant="h6">Saved Diseases</Typography>
              <Typography variant="body2">View diseases you've saved</Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ backgroundColor: '#ffffff' }}>
          <Card onClick={() => handleNavigation('/profile')} sx={{ cursor: 'pointer' }}>
            <CardContent>
              <Typography variant="h6">Recent Symptoms</Typography>
              <Typography variant="body2">Review your recent symptom analyses</Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Explore Proteins & Diseases */}
        <Box sx={{ backgroundColor: '#e0e0e0' }}>
          <Card onClick={() => handleNavigation('/exploreProteins')} sx={{ cursor: 'pointer' }}>
            <CardContent>
              <Typography variant="h6">Explore Proteins & Diseases</Typography>
              <Typography variant="body2">Understand connections between proteins and diseases</Typography>
            </CardContent>
          </Card>
        </Box>
        
      </Box>
    </div>
  );
}