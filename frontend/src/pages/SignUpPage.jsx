import React, { useState, useEffect } from 'react';
import { signup } from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container, useTheme } from '@mui/material';
import CircularColor from '../components/LoadingComponent';

export default function SignUpForm() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();

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
    setResponseMsg('');

    try {
      const signupResponse = await signup(formData);
      if (signupResponse.username) {
        setShouldRedirect(true);
        setResponseMsg('Sign-up successful! Redirecting...');
      } else {
        setResponseMsg('Sign-up failed, please try again.');
      }
    } catch (error) {
      setResponseMsg('An error occurred. Please try again.');
      console.error('Sign-up failed:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (shouldRedirect) {
      setTimeout(() => navigate('/login'), 2000);
    }
  }, [shouldRedirect, navigate]);

  return (
    <Container maxWidth="xs" sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Create an Account
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 2 }}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          sx={{ mb: 2, backgroundColor: theme.palette.mode === 'dark' ? '#424242' : '#fff', color: theme.palette.text.primary }}
       
        />

        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          sx={{ mb: 2, backgroundColor: theme.palette.mode === 'dark' ? '#424242' : '#fff', color: theme.palette.text.primary }}
        
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{ py: 1.5, backgroundColor: '#007bff', '&:hover': { backgroundColor: '#0056b3' } }}
        >
          {loading ? <CircularColor /> : 'Sign Up'}
        </Button>

        {responseMsg && (
          <Typography variant="body2" color={shouldRedirect ? 'success.main' : 'error.main'} sx={{ mt: 2 }}>
            {responseMsg}
          </Typography>
        )}
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography variant="body2">
          Already have an account?
        </Typography>
        <Button onClick={() => navigate('/login')} variant="outlined" sx={{ mt: 1, width: '100%' }}>
          Login
        </Button>
      </Box>
    </Container>
  );
}