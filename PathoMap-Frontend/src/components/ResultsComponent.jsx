import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';

function renderResult(props) {
  const { index, style,data } = props;
    const result = data[index]
  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
      <ListItemText primary={result.disease_name || `Item ${index + 1}`} /> {/* Assuming `result.name` is the disease name */}
      </ListItemButton>
    </ListItem>
  );
}

export default function Results({results}) {
  return (
    <Box
      sx={{ width: '100%', height: 400, maxWidth: 360, bgcolor: 'background.paper' }}
    >
      <FixedSizeList
        height={400}
        width={360}
        itemSize={46}
        itemCount={results.length}
        overscanCount={5}
        itemData={results}
      >
        {renderResult}
      </FixedSizeList>
    </Box>
  );
}
