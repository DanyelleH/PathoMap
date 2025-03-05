import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { getDiseases } from "../api/DiseaseAPI";

export default function SearchBar( { onSearch, searchPrompt }) {
    const [query,setQuery]=useState("")
   
    const handleInputChange = (e) => {
        setQuery(e.target.value);
      };
    
      const handleSubmit = (e) => {
        e.preventDefault(); 

        if (query.trim()) {
          onSearch(query); 
          setQuery(""); // need to add user notice of loading results.
        }
      };
    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            value={query}
            onChange={handleInputChange}
            placeholder= {searchPrompt}
            variant="outlined"
            size="small"
            style={{ marginRight: '10px', width: '300px' }}
          />
          <IconButton type="submit">
            <SearchIcon />
          </IconButton>
        </form>
      );
    }