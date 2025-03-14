import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { getDiseases } from "../api/DiseaseAPI";

export default function SearchBar({ onSearch, searchPrompt }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query.trim()) {
      onSearch(query);
      setQuery(""); // Clear input after search
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        value={query}
        onChange={handleInputChange}
        placeholder={searchPrompt}
        variant="outlined"
        size="small"
        style={{
          marginRight: '10px',
          width: '300px',
          backgroundColor: '#ffffff', // Light background for the input
          color: '#000000', // Dark text color for readability
          borderRadius: '8px', // Rounded corners for a cleaner look
        }}
      
      />
      <IconButton type="submit" sx={{ color: 'indigo', background:"lavender", transition: '0.3s','&:hover': { color: '#D8BFD8' } }}> 
        <SearchIcon />
      </IconButton>
    </form>
  );
}