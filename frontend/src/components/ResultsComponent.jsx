import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';

export default function Results({ results, onClick }) {
  return (
    <Box
      sx={{
        width: '100%',
        maxHeight: 400,
        maxWidth: 800,
        bgcolor: '#000000',
        borderRadius: 2,
        boxShadow: 2,
        overflowY: 'auto',
        padding: 2, 
      }}
    >
      <List>
        {results.map((result, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => onClick(result.pk)}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom:1.5,
                padding: 2, // Adds padding inside the list item
                backgroundColor: "#C6CAED",
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: '#FFDDD2', // Light hover effect
                  transform: 'scale(1.02)', // Slightly enlarges the item on hover
                },
              }}
            >
              <ListItemText 
                primary={result.disease_name || `Item ${index + 1}`} 
                sx={{
                  color: '#000000',
                  fontWeight: 'medium',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}