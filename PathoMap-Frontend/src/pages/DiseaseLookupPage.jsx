import React, { useState } from "react"
import SearchBar from "../components/SearchBar"
import { getDiseases } from "../api/DiseaseAPI"
import Results from "../components/ResultsComponent"


export default function DiseaseLookup() {
    const [results, setDiseaseResults] =useState([])
    const [isLoading, setIsLoading] = useState(false);
    const handleSearch = async (disease_name) => {
        console.log(disease_name)
        setIsLoading(true)
    try {
        const token = localStorage.getItem("userToken")
        const disease = await getDiseases(token, disease_name)
        setDiseaseResults(disease)
    } catch (error) {
        console.error("Error fetching diseases:", error);
        setDiseaseResults([]); // Clear results if there’s an error
    } finally {
        setIsLoading(false); // Set loading to false once the request is done
    }
};
    return (
        <>
        <div id="searchBar">
            <SearchBar onSearch={handleSearch}/>
        </div>
        <div>
                {isLoading ? <p>Loading...</p> : <Results results={results} />}
            </div>
       </>
    )
}