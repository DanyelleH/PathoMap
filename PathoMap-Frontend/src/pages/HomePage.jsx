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
        padding: 4,
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'PathoMap-Frontend/src/assets/image.png',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          opacity: 0.1,
          zIndex: 0,
        }
        
      }}
    >
      {/* App Title */}
      <Container maxWidth="sm" sx={{ textAlign: 'center', mb: 4 }}>
        <Typography
          variant="h3"
          sx={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 2 }}
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
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 3,
          justifyContent: 'center',
          maxWidth: '900px',
        }}
      >
        {[{
          icon: <SearchIcon sx={{ fontSize: '3rem' }} />, title: 'Search for a Disease',
          description: 'Find diseases by name', path: '/diseaseLookup'
        }, {
          icon: <BookmarkIcon sx={{ fontSize: '3rem' }} />, title: 'Saved Diseases',
          description: 'View diseases you have saved', path: '/profile'
        }, {
          icon: <HistoryIcon sx={{ fontSize: '3rem' }} />, title: 'Recent Symptoms',
          description: 'Review your recent symptom analyses', path: '/profile'
        }].map((card, index) => (
          <Card
            key={index}
            onClick={() => handleNavigation(card.path)}
            sx={{
              cursor: 'pointer',
              transition: '0.3s',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 6px 15px rgba(0,0,0,0.2)',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              },
              borderRadius: 2,
              padding: 2,
              width: { xs: '100%', sm: 'calc(33.33% - 1rem)' },
              textAlign: 'center',
              color: 'white',
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
