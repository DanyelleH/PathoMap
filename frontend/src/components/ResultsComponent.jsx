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
        maxWidth: 360,
        maxHeight: 400, // Limits the maximum height to 400px
        bgcolor: 'background.paper',
        border: '1px solid #ddd',
        borderRadius: 2,
        boxShadow: 2,
        overflowY: 'auto', // Enables scrolling if content overflows
        padding: 2, // Adds padding for a more spacious feel
      }}
    >
<Typography variant="h6" color="primary" fontWeight="bold" mb={2} align="left">
  Search results:
</Typography>
      <List>
        {results.map((result, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => onClick(result.pk)}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: 2, // Adds padding inside the list item
                '&:hover': {
                  backgroundColor: '#f5f5f5', // Light hover effect
                  transform: 'scale(1.02)', // Slightly enlarges the item on hover
                },
              }}
            >
              <ListItemText 
                primary={result.disease_name || `Item ${index + 1}`} 
                sx={{
                  color: '#333', // Dark text color
                  fontWeight: 'medium', // Ensures text is easily readable
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}