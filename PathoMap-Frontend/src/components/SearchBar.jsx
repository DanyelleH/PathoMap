import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { getDiseases } from "../api/DiseaseAPI";

export default function SearchBar( { onSearch }) {
    const [query,setQuery]=useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (query.trim()) {
            onSearch(query);
          }

    }
    return (
        <>
            <form onSubmit={handleSubmit}> 
                <TextField
                id="searchBar"
                className="text"
                placeholder="Search Disease Name"
                size="small"
                onChange={(e) => setQuery(e.target.value)}
                />
                <IconButton type="submit" >
                    <SearchIcon />
                </IconButton>
            
            </form>
        </>
    )
}