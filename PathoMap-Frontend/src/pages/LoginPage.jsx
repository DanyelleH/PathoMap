import { useContext, useState } from 'react';
import Form from '../components/LoginForm';
import { login } from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import CircularColor from '../components/LoadingComponent';
import UserContext from '../contexts/UserContext';
import { Box, Button, Typography, Container } from '@mui/material';
import { getUserInfo } from '../api/usersAPI';
export default function Login() {
  const [responseMsg, setResponseMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const { handleToken, formData, handleFormDataChange, setUserInfo } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const token = await login(formData);
  
      if (token) {
        handleToken(token, formData.username);
        localStorage.setItem('userToken', token);
        localStorage.setItem('username', formData.username);

        // Fetch user info and wait for it to finish before navigating
        await fetchUserInfo(token);

        // Now that user info is fetched, navigate to home
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

  const fetchUserInfo = async (token) => {
    const username = localStorage.getItem("username");
    const userToken = localStorage.getItem("userToken");

    if (username && userToken) {
      try {
        const info = await getUserInfo(username, userToken); // Ensure this API function is correct
        localStorage.setItem("userProfile", JSON.stringify(info));
        setUserInfo(info)
        
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    }
  };

  return (
    <Container maxWidth="xs" sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {loading ? (
        <CircularColor />
      ) : (
        <>
          <Typography variant="h4" gutterBottom align="center">
            Login
          </Typography>
          
          <Form 
            formType="Login"
            handleSubmit={handleSubmit}
            formData={formData}
            handleFormDataChange={handleFormDataChange}
          />
          
          {responseMsg && (
            <Typography variant="body2" color="error" sx={{ marginTop: 2, textAlign: 'center' }}>
              {responseMsg}
            </Typography>
          )}
          
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 3 }}>
            <Typography variant="body2" align="center" sx={{ marginBottom: 1 }}>
              New User?
            </Typography>
            <Button 
              onClick={() => navigate("/signup")}
              variant="contained"
              sx={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#007bff',
                '&:hover': { backgroundColor: '#0056b3' }
              }}
            >
              Create an Account
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
}