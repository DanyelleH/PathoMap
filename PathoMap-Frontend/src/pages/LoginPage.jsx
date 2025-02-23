import { useState } from 'react'
import Form from '../components/LoginForm';
import { Navigate } from 'react-router-dom';
import { login } from '../api/authApi';
import { useNavigate } from "react-router-dom";
export default function Login({formData, handleInputChange,handleToken }){
    const [responseMsg, setResponseMsg] = useState("")
    const [shouldRedirect, setShouldRedirect] = useState(false)
    const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const context = {username: formData.username, password: formData.password}

    const token = await login(context)
    if(!token) {
      setResponseMsg("Error logging in")
    } else {
      handleToken(token)
      setShouldRedirect(true)
    }
  }
  if (shouldRedirect) {
    return <Navigate to="/home"/>
  } else {
    return (
        <>
            <Form formType={"Login"} handleInputChange={handleInputChange} formData={formData}handleToken={handleToken} handleSubmit={handleSubmit} responseMsg={responseMsg}/>
             <p> New User? </p>
            <button onClick={()=> navigate("/signup")} >Create an Account</button>
        </>
    )
  }
  
}

