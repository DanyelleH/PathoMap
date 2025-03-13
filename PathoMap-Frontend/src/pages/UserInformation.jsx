import React, { useState, useContext } from 'react';
import { Box, TextField, Button, useTheme, useMediaQuery } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { useNavigate } from 'react-router-dom';
import { updateUserInfo } from '../api/usersAPI';
import dayjs from "dayjs";
import CircularColor from '../components/LoadingComponent';
import UserContext from '../contexts/UserContext';

const UserInfo = ({ handleInputChange, handleToken }) => {
    const { setUserInfo } = useContext(UserContext);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const username = localStorage.getItem("username");
    const userToken = localStorage.getItem("userToken");
    const navigate = useNavigate();
    
    const theme = useTheme();
    const isDarkMode = theme.palette.mode === 'dark';  // Check if dark mode is active

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const userData = new FormData(e.target);
        const formattedDate = dayjs(userData.get("dob"), "MM/DD/YYYY").format("YYYY-MM-DD");

        const context = {};

        if (userData.get("firstName")) context.first_name = userData.get("firstName");
        if (userData.get("lastName")) context.last_name = userData.get("lastName").trim();
        if (userData.get("dob")) context.dob = formattedDate;
        if (userData.get("email")) context.email = userData.get("email");

        try {
            const response = await updateUserInfo(username, context, userToken);
            if (!response) {
                throw new Error("Failed to update user information");
            } else {
                setUserInfo(response);
                localStorage.setItem("userProfile", JSON.stringify(response));
                navigate("/profile");
            }
        } catch (error) {
            console.error("Error updating user:", error);
            setErrorMessage("Failed to update user. Please try again.");
        }
    };

    return (
        <>
            {loading ? (
                <CircularColor />
            ) : (
                <div className="form-container">
                    {errorMessage && <h2 className="error-message" style={{ color: isDarkMode ? 'red' : 'black' }}>{errorMessage}</h2>}
                    <Box
                        component="form"
                        sx={{
                            width: '100%',
                            maxWidth: 400,
                            padding: '20px',
                            borderRadius: '8px',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                            backgroundColor: isDarkMode ? '#333' : '#fff',
                            margin: 'auto',
                            color: isDarkMode ? 'white' : 'black',
                        }}
                        onSubmit={handleSubmit}
                        noValidate
                        autoComplete="off"
                    >
                        <h2 style={{ textAlign: 'center' }}>Update profile information</h2>

                        {/* First Name */}
                        <TextField
                            fullWidth
                            required
                            id="firstName"
                            label="First Name"
                            name="firstName"
                            onChange={handleInputChange}
                            sx={{
                                '& .MuiInputBase-input': {
                                    color: isDarkMode ? 'white' : 'black',
                                },
                                marginBottom: '15px',
                            }}
                        />

                        {/* Last Name */}
                        <TextField
                            fullWidth
                            required
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            onChange={handleInputChange}
                            sx={{
                                '& .MuiInputBase-input': {
                                    color: isDarkMode ? 'white' : 'black',
                                },
                                marginBottom: '15px',
                            }}
                        />

                        {/* Email */}
                        <TextField
                            fullWidth
                            required
                            id="email"
                            label="Email"
                            type="email"
                            name="email"
                            onChange={handleInputChange}
                            sx={{
                                '& .MuiInputBase-input': {
                                    color: isDarkMode ? 'white' : 'black',
                                },
                                marginBottom: '15px',
                            }}
                        />

                        {/* Date of Birth */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateField
                                fullWidth
                                required
                                id="dob"
                                name="dob"
                                label="Date of Birth"
                                sx={{
                                    '& .MuiInputBase-input': {
                                        color: isDarkMode ? 'white' : 'black',
                                    },
                                    marginBottom: '15px',
                                }}
                            />
                        </LocalizationProvider>

                        {/* Submit Button */}
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            sx={{
                                marginTop: '10px',
                                backgroundColor: '#007bff',
                                '&:hover': { backgroundColor: '#0056b3' },
                            }}
                        >
                            Submit
                        </Button>
                    </Box>
                </div>
            )}
        </>
    );
};

export default UserInfo;