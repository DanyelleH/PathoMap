import React from 'react';
import { Card, CardContent, Typography, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HistoryIcon from '@mui/icons-material/History';

export default function HomePage() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #6a11cb, #2575fc)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 3,
        py: 5,
        color: 'white',
        position: 'relative',
        textAlign: 'center',
      }}
    >
      {/* App Title */}
      <Container maxWidth="sm" sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          sx={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 1 }}
        >
          PathoMap
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 'light', mt: 1 }}>
          Real-time Medical Insight
        </Typography>
      </Container>

      {/* Quick Navigation Cards */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap', // This ensures the cards stack when needed
          justifyContent: 'center',
          gap: 3, // Spacing between the cards
          maxWidth: 900,
          width: '100%',
        }}
      >
        {[
          {
            icon: <SearchIcon sx={{ fontSize: '3rem' }} />,
            title: 'Search for a Disease',
            description: 'Find diseases by name',
            path: '/diseaseLookup',
          },
          {
            icon: <BookmarkIcon sx={{ fontSize: '3rem' }} />,
            title: 'Saved Diseases',
            description: 'View diseases you have saved',
            path: '/profile',
          },
          {
            icon: <HistoryIcon sx={{ fontSize: '3rem' }} />,
            title: 'Recent Symptoms',
            description: 'Review your recent symptom analyses',
            path: '/profile',
          },
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
              minWidth: 250,
              borderRadius: 2,
              p: 3,
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
  );
}