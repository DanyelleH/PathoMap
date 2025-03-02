import { useState } from 'react'
import Form from '../components/LoginForm';
import { Navigate } from 'react-router-dom';
import { login } from '../api/authApi';
import { useNavigate } from "react-router-dom";
import CircularColor from '../components/LoadingComponent';
export default function Login({formData, handleInputChange,handleToken }){
    const [responseMsg, setResponseMsg] = useState("")
    const [shouldRedirect, setShouldRedirect] = useState(false)
    const [loading, setLoading]=useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const context = {username: formData.username, password: formData.password}
        const token = await login(context)
        if(!token) {
          setResponseMsg("Error logging in")
        } else {
          handleToken(token)
          setShouldRedirect(true)
          localStorage.setItem("username", formData.username);
          localStorage.setItem("token",token);
          // #store username in storage
        }
      } catch (error) {
        setResponseMsg("An error occured during login.")
        console.error("Login Error:", error )
      } finally {
        setLoading(false);
      }
  };
  if (shouldRedirect) {
    return <Navigate to="/home" />;  
  }
    return (
      <>
        {loading ? (
          <CircularColor />
        ) : (
          <>
            <Form formType={"Login"} handleInputChange={handleInputChange} formData={formData}handleToken={handleToken} handleSubmit={handleSubmit} responseMsg={responseMsg}/>
             <p> New User? </p>
            <button onClick={()=> navigate("/signup")} >Create an Account</button>
        </>
        )}
      </>
    );
  }


