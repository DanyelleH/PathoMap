import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

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
      }}
      >
      <List>
        {results.map((result, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton  onClick={() => onClick(result.pk)} >
          
              <ListItemText primary={result.disease_name || `Item ${index + 1}`} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}