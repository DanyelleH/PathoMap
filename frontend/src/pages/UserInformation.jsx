import React, { useState, useContext } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  useMediaQuery,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { useNavigate } from 'react-router-dom';
import { updateUserInfo } from '../api/usersAPI';
import dayjs from 'dayjs';
import CircularColor from '../components/LoadingComponent';
import UserContext from '../contexts/UserContext';
import { useTheme } from '../contexts/themeContext';

const UserInfo = ({ handleInputChange, handleToken, closeDialog }) => {
  const { setUserInfo } = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const username = localStorage.getItem('username');
  const userToken = localStorage.getItem('userToken');
  const navigate = useNavigate();
  const theme = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userData = new FormData(e.target);
    const formattedDate = dayjs(userData.get('dob'), 'MM/DD/YYYY').format('YYYY-MM-DD');

    const context = {};
    if (userData.get('firstName')) context.first_name = userData.get('firstName').trim();
    if (userData.get('lastName')) context.last_name = userData.get('lastName').trim();
    if (userData.get('dob')) context.dob = formattedDate;
    if (userData.get('email')) context.email = userData.get('email').trim();

    try {
      const response = await updateUserInfo(username, context, userToken);
      if (!response) {
        throw new Error('Failed to update user information');
      }
      setUserInfo(response);
      localStorage.setItem('userProfile', JSON.stringify(response));
      closeDialog();
    } catch (error) {
      console.error('Error updating user:', error);
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <CircularColor />
      ) : (
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
          sx={{
            maxWidth: 450,
            width: '100%',
            margin: 'auto',
            padding: 4,
            borderRadius: 3,
            boxShadow: 3,
            backgroundColor: "#94a3b8",
          }}
        >
          <Typography variant="h5" align="center" gutterBottom>
            Update Your Profile
          </Typography>

          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}

          <TextField
            fullWidth
            required
            id="firstName"
            name="firstName"
            label="First Name"
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            required
            id="lastName"
            name="lastName"
            label="Last Name"
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            required
            id="email"
            name="email"
            label="Email"
            type="email"
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              fullWidth
              required
              id="dob"
              name="dob"
              label="Date of Birth"
              sx={{ mb: 3 }}
            />
          </LocalizationProvider>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              py: 1.5,
              fontWeight: 'bold',
              fontSize: '1rem',
              textTransform: 'none',
            }}
          >
            Save Changes
          </Button>
        </Box>
      )}
    </>
  );
};

export default UserInfo;