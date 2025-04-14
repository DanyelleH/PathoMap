import React from 'react';
import { Card, CardContent, Typography, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BiotechIcon from '@mui/icons-material/Biotech';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import MasksIcon from '@mui/icons-material/Masks';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
export default function HomePage() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
    {/* App Title */}
    <Container maxWidth="sm" sx={{ mb: 4 }}>
      <Typography
        variant="h3"
        sx={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 }}
      >
        PathoMap
      </Typography>
      <Typography variant="h6" sx={{ fontWeight: 'light', mt: 1 }}>
        Real-time Medical Insights
      </Typography>
    </Container>
    <Box
      sx={{
        background: 'linear-gradient( #6a11cb,rgb(152, 65, 223))',
        py: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: 10
      }}
    >

      {/* Quick Navigation Cards */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap', // This ensures the cards stack when needed
          justifyContent: 'center',
          gap: 3, // Spacing between the cards
          maxWidth: 800,
          width: '100%',
        }}
      >
        {[
          {
            icon: <BiotechIcon sx={{ fontSize: '3rem' }} />,
            title: 'Search for a Disease',
            description: 'Find diseases by name',
            path: '/diseaseLookup',
          },
          {
            icon: <SavedSearchIcon sx={{ fontSize: '3rem' }} />,
            title: 'Saved Diseases',
            description: 'View diseases you have saved',
            path: '/profile',
          },
          {
            icon: <MasksIcon sx={{ fontSize: '3rem' }} />,
            title: 'Recent Symptoms',
            description: 'Review your recent symptom analyses',
            path: '/profile',
          },
          {
            icon: <AutoStoriesIcon sx={{ fontSize: '3rem' }} />,
            title: 'About Us',
            description: 'Learn about the Developer',
            path: '/aboutUs',
          }
        ].map((card, index) => (
          <Card
            key={index}
            onClick={() => handleNavigation(card.path)}
            sx={{
              cursor: 'pointer',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: 250,
              borderRadius: 5,
              p: 4,
              textAlign: 'center',
              color: 'white',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 10px 20px rgba(0,0,0,0.25)',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
            }}
          >
            <CardContent>
              {card.icon}
              <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
                {card.title}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, mt: 1 }}>
                {card.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
    </>
  );
}