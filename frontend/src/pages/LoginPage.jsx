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
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();

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
        setResponseMsg('User with those credentials was not found. Check username / password and try again, or create an account');
      }
    } catch (error) {
      setResponseMsg('There was an error on our side. Try again later');
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
    <Container
      maxWidth="xs"
      sx={{
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
        Welcome Back
      </Typography>
      <Typography variant="body1" sx={{ mb: 3, color: theme.palette.text.secondary }}>
        Please login to your account.
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
            backgroundColor: theme.palette.mode === 'dark' ? '#424242' : '#fff',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: theme.palette.mode === 'dark' ? '#bbb' : '#ccc',
              },
            },
            '& .MuiInputLabel-root': {
              color: theme.palette.mode === 'dark' ? '#fff' : '#000',
            },
            '& .MuiInputBase-root': {
              color: theme.palette.mode === 'dark' ? '#fff' : '#000',
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
            backgroundColor: theme.palette.mode === 'dark' ? '#424242' : '#fff',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: theme.palette.mode === 'dark' ? '#bbb' : '#ccc',
              },
            },
            '& .MuiInputLabel-root': {
              color: theme.palette.mode === 'dark' ? '#fff' : '#000',
            },
            '& .MuiInputBase-root': {
              color: theme.palette.mode === 'dark' ? '#fff' : '#000',
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{
            py: 1.5,
            backgroundColor: loading ? theme.palette.grey[400] : theme.palette.primary.main,
            '&:hover': { backgroundColor: loading ? theme.palette.grey[400] : theme.palette.primary.dark },
            mt: 2,
          }}
        >
          {loading ? <CircularColor /> : 'Login'}
        </Button>
        {responseMsg && (
          <Typography
            variant="body2"
            color="error.main"
            sx={{ mt: 2, fontWeight: 'bold', lineHeight: 1.4 }}
          >
            {responseMsg}
          </Typography>
        )}
      </Box>
      <Box sx={{ mt: 3 }}>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          New User?
        </Typography>
        <Button
          onClick={() => navigate('/signup')}
          variant="outlined"
          sx={{
            mt: 1,
            width: '100%',
            color: theme.palette.primary.main,
            borderColor: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.primary.main,
              color: '#fff',
            },
          }}
        >
          Create an Account
        </Button>
      </Box>
    </Container>
  );
}