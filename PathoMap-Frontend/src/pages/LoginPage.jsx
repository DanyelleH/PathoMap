import { useContext, useState } from 'react'
import Form from '../components/LoginForm';
import { Navigate } from 'react-router-dom';
import { login } from '../api/authApi';
import { useNavigate } from "react-router-dom";
import CircularColor from '../components/LoadingComponent';
import UserContext from '../contexts/UserContext';
export default function Login(){
    const [responseMsg, setResponseMsg] = useState("")
    const [shouldRedirect, setShouldRedirect] = useState(false)
    const [loading, setLoading]=useState(false)
    const {formData, handleToken } = useContext(UserContext)

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
        
        }
      } catch (error) {
        setResponseMsg("An error occured during login.")
        console.error("Login Error:", error )
      } finally {
        setLoading(false);
      }
  };
  if (shouldRedirect) {
    return <Navigate to="/profile" />;
  }
    return (
      <>
        {loading ? (
          <CircularColor />
        ) : (
          <>
            <Form formType={"Login"} handleSubmit={handleSubmit}/>
             <p> New User? </p>
            <button onClick={()=> navigate("/signup")} >Create an Account</button>
        </>
        )}
      </>
    );
  }


