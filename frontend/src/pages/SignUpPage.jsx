import React, { useState, useEffect } from 'react';
import { signup } from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  useTheme,
} from '@mui/material';
import CircularColor from '../components/LoadingComponent';

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear confirm password error on change
    if (name === 'confirmPassword' || name === 'password') {
      setConfirmError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMsg('');
    setConfirmError('');
    setLoading(true);

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setConfirmError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      const { username, password } = formData;
      const signupResponse = await signup({ username, password });

      if (Array.isArray(signupResponse.username)) {
        setResponseMsg(signupResponse.username.join(', '));
      } else {
        setShouldRedirect(true);
        setResponseMsg('Sign-up successful! Redirecting...');
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
      const timeout = setTimeout(() => navigate('/login'), 2000);
      return () => clearTimeout(timeout);
    }
  }, [shouldRedirect, navigate]);

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Create an Account
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            margin="normal"
            autoComplete="username"
            autoFocus
            required
          />

          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            margin="normal"
            autoComplete="new-password"
            required
          />

          <TextField
            label="Confirm Password"
            variant="outlined"
            fullWidth
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            margin="normal"
            required
            error={!!confirmError}
            helperText={confirmError}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{ mt: 3, py: 1.5 }}
          >
            {loading ? <CircularColor /> : 'Sign Up'}
          </Button>

          {responseMsg && (
            <Typography
              variant="body2"
              color={shouldRedirect ? 'success.main' : 'error.main'}
              sx={{ mt: 2, textAlign: 'center' }}
            >
              {responseMsg}
            </Typography>
          )}
        </Box>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2">
            Already have an account?
          </Typography>
          <Button
            onClick={() => navigate('/login')}
            variant="text"
            sx={{ mt: 1 }}
          >
            Go to Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}