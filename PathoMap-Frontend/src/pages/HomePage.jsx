import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Box 
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: 3,
      }}
    >
      {/* App Title */}
      <Typography variant="h3" sx={{ fontWeight: 'bold', marginBottom: 3, textAlign: 'center' }}>
        PathoMap: <br></br> Realtime Medical Insight
      </Typography>

      {/* Grid Container */}
      <Box 
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, // 1 column on mobile, 2 on larger screens
          gap: 3,
          width: '100%',
          maxWidth: '800px',
        }}
      >
        {/* Card Components */}
        {[
          { title: 'Search for a Disease', description: 'Find diseases by name', path: '/diseaseLookup' },
          { title: 'Saved Diseases', description: "View diseases you've saved", path: '/profile' },
          { title: 'Recent Symptoms', description: 'Review your recent symptom analyses', path: '/profile' },
        ].map((item, index) => (
          <Card
            key={index}
            onClick={() => handleNavigation(item.path)}
            sx={{
              cursor: 'pointer',
              transition: '0.3s',
              '&:hover': { transform: 'scale(1.05)', boxShadow: '0 6px 15px rgba(0,0,0,0.2)' },
              borderRadius: 2,
            }}
          >
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {item.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {item.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}