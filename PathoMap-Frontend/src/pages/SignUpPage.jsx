import React, { useState, useContext, useEffect } from 'react';
import { signup } from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import { Box, Button, TextField, Typography, Container, CircularProgress } from '@mui/material';

export default function SignUpForm() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { username, password } = formData;

    try {
      const signupResponse = await signup({ username, password });

      if (signupResponse.username && signupResponse.password) {
        setShouldRedirect(true);
        setResponseMsg('Sign-up successful!');
      } else {
        setResponseMsg('Sign-up failed, please try again.');
      }
    } catch (error) {
      setResponseMsg('Sign-up failed, please try again.');
      console.error('Sign-up failed:', error);
    } finally {
      setLoading(false);
    }
  };

  // Perform redirection when signup is successful
  useEffect(() => {
    if (shouldRedirect) {
      navigate('/login');
    }
  }, [shouldRedirect, navigate]);

  return (
    <Container maxWidth="xs" sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" gutterBottom align="center">
        Sign Up
      </Typography>

      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </Box>

        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ padding: '10px', backgroundColor: '#007bff', '&:hover': { backgroundColor: '#0056b3' } }}
        >
          {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Sign Up'}
        </Button>

        {responseMsg && (
          <Typography variant="body2" color={responseMsg === 'Sign-up successful!' ? 'success.main' : 'error.main'} sx={{ marginTop: 2, textAlign: 'center' }}>
            {responseMsg}
          </Typography>
        )}
      </form>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 3 }}>
        <Typography variant="body2" align="center" sx={{ marginBottom: 1 }}>
          Already have an account?
        </Typography>
        <Button
          onClick={() => navigate('/login')}
          variant="outlined"
          sx={{ width: '100%' }}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
}