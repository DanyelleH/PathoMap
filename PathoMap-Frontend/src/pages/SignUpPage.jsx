import React, {useState} from 'react';
import { signup } from '../api/authApi';
import Form from '../components/LoginForm';
import { Navigate } from 'react-router-dom';

export default function SignUpForm({handleInputChange, formData}){
        // const [confirmPassword, setConfirmPassword] = useState("")
        const [shouldRedirect, setShouldRedirect] = useState(false)
        const [errorMessage, setErrorMessage] = useState("")
        

        const handleSubmit = async (e) => {
            e.preventDefault();
        
        // if (formData.password !== confirmPassword){
        //     setErrorMessage("Passwords do not match, please try again")
        // }

        const context = { username: formData.username , password: formData.password}
        const response = await signup(context)
            if(response.password) {
            setShouldRedirect(true)
            } else {
            setErrorMessage(response.username)
            }
        }
        if (shouldRedirect) {
            return <Navigate to="/new-user" /> 
        } else{
            return (
                 <Form formType={"Signup"} handleInputChange={handleInputChange} formData={formData} handleSubmit={handleSubmit} errorMessage={errorMessage}/>
    )
}}