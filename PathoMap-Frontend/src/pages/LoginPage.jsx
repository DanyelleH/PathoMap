import { useContext, useState } from 'react';
import Form from '../components/LoginForm';
import { login } from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import CircularColor from '../components/LoadingComponent';
import UserContext from '../contexts/UserContext';

export default function Login() {
  const [responseMsg, setResponseMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { handleToken, formData, handleFormDataChange } = useContext(UserContext);

  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  const navigate = useNavigate();


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
    
  //   try {
  //     // const context = { username: formData.username, password: formData.password };
  //     const token = await login(formData);
      
  //     if (token) {
  //       handleToken(token, formData.username, formData.password);
  //       navigate("/profile"); 
  //     } else {
  //       setResponseMsg("Error logging in");
  //     }
  //   } catch (error) {
  //     setResponseMsg("An error occurred during login.");
  //     console.error("Login Error:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const token = await login(formData);
  
      if (token) {
        handleToken(token, formData.username);
        navigate("/profile");  
      } else {
        setResponseMsg("Error logging in");
      }
    } catch (error) {
      setResponseMsg("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <CircularColor />
      ) : (
        <>
          <Form 
            formType="Login"
            handleSubmit={handleSubmit}
            formData={formData}
            handleFormDataChange={handleFormDataChange}
            />
            <p>{responseMsg}</p>
          <p>New User?</p>
          <button onClick={() => navigate("/signup")}>Create an Account</button>
        </>
      )} 
    </>
  );
}