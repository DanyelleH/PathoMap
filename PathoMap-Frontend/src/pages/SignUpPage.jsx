import React, {useContext, useState} from 'react';
import { signup } from '../api/authApi';
import Form from '../components/LoginForm';
import { Navigate, useNavigate } from 'react-router-dom';
import { login } from '../api/authApi';
import UserContext from '../contexts/UserContext';

export default function SignUpForm(){
        // const [confirmPassword, setConfirmPassword] = useState("")
        const [shouldRedirect, setShouldRedirect] = useState(false)
        const [errorMessage, setErrorMessage] = useState("")
        const [username, setusername] =useState(null)
        const [password,setPassword]=useState(null)
        const {formData , setFormData , handleInputChange} = useContext(UserContext)
        const navigate = useNavigate()
        const handleSubmit = async (e) => {
            e.preventDefault();
            
        const context = { username: formData.username , password: formData.password}
        const signupResponse = await signup(context)


        if (signupResponse.username && signupResponse.password)  {
            setShouldRedirect(true)
        }
    };
            
        if (shouldRedirect) {
            setShouldRedirect(false)
            navigate("/login")
        } else{
            return (
                 <Form />
    )
}}