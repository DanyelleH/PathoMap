import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container, useTheme } from '@mui/material';
import CircularColor from '../components/LoadingComponent';
import UserContext from '../contexts/UserContext';
import { login } from '../api/authApi';
import { getUserInfo } from '../api/usersAPI';

export default function Login() {
  const [responseMsg, setResponseMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const { handleToken, formData, handleFormDataChange, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const theme = useTheme();  // Access the theme object

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg('');

    try {
      const token = await login(formData);
      if (token) {
        handleToken(token, formData.username);
        localStorage.setItem('userToken', token);
        localStorage.setItem('username', formData.username);
        await fetchUserInfo(token);
        navigate('/profile');
      } else {
        setResponseMsg('Error logging in');
      }
    } catch (error) {
      setResponseMsg('An error occurred during login.');
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserInfo = async (token) => {
    const username = localStorage.getItem('username');
    const userToken = localStorage.getItem('userToken');
    if (username && userToken) {
      try {
        const info = await getUserInfo(username, userToken);
        localStorage.setItem('userProfile', JSON.stringify(info));
        setUserInfo(info);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    }
  };

  return (
    <Container maxWidth="xs" sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 2 }}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          name="username"
          value={formData.username}
          onChange={handleFormDataChange}
          sx={{
            mb: 2,
            backgroundColor: theme.palette.mode === 'dark' ? '#424242' : '#fff', // Dark mode background
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: theme.palette.mode === 'dark' ? '#bbb' : '#ccc', // Border color for dark/light
              },
            },
            '& .MuiInputLabel-root': {
              color: theme.palette.mode === 'dark' ? '#fff' : '#000', // Label color
            },
            '& .MuiInputBase-root': {
              color: theme.palette.mode === 'dark' ? '#fff' : '#000', // Text color
            },
          }}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          name="password"
          type="password"
          value={formData.password}
          onChange={handleFormDataChange}
          sx={{
            mb: 2,
            backgroundColor: theme.palette.mode === 'dark' ? '#424242' : '#fff', // Dark mode background
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: theme.palette.mode === 'dark' ? '#bbb' : '#ccc', // Border color for dark/light
              },
            },
            '& .MuiInputLabel-root': {
              color: theme.palette.mode === 'dark' ? '#fff' : '#000', // Label color
            },
            '& .MuiInputBase-root': {
              color: theme.palette.mode === 'dark' ? '#fff' : '#000', // Text color
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{ py: 1.5, backgroundColor: '#007bff', '&:hover': { backgroundColor: '#0056b3' } }}
        >
          {loading ? <CircularColor /> : 'Login'}
        </Button>
        {responseMsg && (
          <Typography variant="body2" color="error.main" sx={{ mt: 2 }}>
            {responseMsg}
          </Typography>
        )}
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography variant="body2">
          New User?
        </Typography>
        <Button onClick={() => navigate('/signup')} variant="outlined" sx={{ mt: 1, width: '100%' }}>
          Create an Account
        </Button>
      </Box>
    </Container>
  );
}