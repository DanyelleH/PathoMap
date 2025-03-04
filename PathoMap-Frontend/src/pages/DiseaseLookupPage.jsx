import React, { useState } from "react"
import SearchBar from "../components/SearchBar"
import { getDiseases } from "../api/DiseaseAPI"
import Result from "../components/ResultsComponent"


export default function DiseaseLookup( handleToken) {
    const [results, setResults] =useState([])
//     const token= localStorage.getItem("token")
    
    const handleSearch =async (e) => {
        const disease_name = e
        const token = localStorage.getItem("token")
        const disease = await getDiseases(token, disease_name)
        setResults([disease])
        console.log(disease)
        
    }
    return (
        <>
        <div id="searchBar">
            <SearchBar onSearch={handleSearch}/>
        </div>
        <div>
            <Result />
        </div>
       </>
    )
}