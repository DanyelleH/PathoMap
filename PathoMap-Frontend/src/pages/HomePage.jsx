import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function  HomePage(handleToken) {
    const username= localStorage.getItem("username")
    
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate(`/new-user/${username}`)
    }
    return (
        <>
        <p> This is the Homepage</p>
        <button onClick={handleNavigate}> Click to update profile</button>
        
        </>
    )
}