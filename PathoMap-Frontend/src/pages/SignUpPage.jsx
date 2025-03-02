import React, {useState} from 'react';
import { signup } from '../api/authApi';
import Form from '../components/LoginForm';
import { Navigate, useNavigate } from 'react-router-dom';
import { login } from '../api/authApi';

export default function SignUpForm({handleInputChange, formData, handleToken}){
        // const [confirmPassword, setConfirmPassword] = useState("")
        const [shouldRedirect, setShouldRedirect] = useState(false)
        const [errorMessage, setErrorMessage] = useState("")
        const [username, setusername] =useState(null)
        const [password,setPassword]=useState(null)

        const handleSubmit = async (e) => {
            e.preventDefault();


        const context = { username: formData.username , password: formData.password}
        const signupResponse = await signup(context)
            console.log(signupResponse)

        if (signupResponse.username && signupResponse.password)  {
            setusername(formData.username)
            setPassword(formData.password)
            setShouldRedirect(true)
        }
    };
            
        if (shouldRedirect) {
            // return <Navigate to={`/new-user/${username}`} /> 
            return <Navigate to={'/login'}/>
        } else{
            return (
                 <Form formType={"Signup"} 
                 handleInputChange={handleInputChange} 
                 formData={formData} 
                 handleSubmit={handleSubmit} errorMessage={errorMessage}/>
    )
}}