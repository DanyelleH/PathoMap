import React, {useState} from 'react';
import { Box, TextField, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { useNavigate, useParams } from 'react-router-dom';
import { updateUserInfo } from '../api/usersAPI';
import dayjs from "dayjs"
import CircularColor from '../components/LoadingComponent';
import { Navigate } from 'react-router-dom';

const UserInfo = ({ handleInputChange, handleToken}) => {

    const [errorMessage, setErrorMessage] = React.useState("");
    const [loading, setLoading] = useState(false);
    const username = localStorage.getItem("username");
    const userToken = localStorage.getItem("userToken");
    const navigate= useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        
        const userData = new FormData(e.target)
        const formattedDate = dayjs(userData.get("dob"), "MM/DD/YYYY").format("YYYY-MM-DD")
        
        
        const context = {};
        
        if (userData.get("firstName")) context.first_name = userData.get("firstName");
        if (userData.get("lastName")) context.last_name = userData.get("lastName").trim();
        if (userData.get("dob")) context.dob = formattedDate;
        if (userData.get("email")) context.email = userData.get("email");
        
        try {
            const response = await updateUserInfo(username,context, userToken);
            console.log("updating information ... ")
            if (!response) {
                throw new Error("Failed to update user information")
                } else {
                    console.log("User Updated:", response)
                    navigate("/profile")
                }
            } catch (error) {
                console.error("Error updating user:", error)
                setErrorMessage("Failed to update user. Please try again.");
            }
        };

    return (
        <>
        {loading ? (
                      <CircularColor />
                    ) : (
        <div className="form-container">
            {errorMessage && <h2 className="error-message">{errorMessage}</h2>}
            <Box
                component="form"
                sx={{
                    width: '100%',
                    maxWidth: 400,
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                    backgroundColor: 'white',
                    margin: 'auto',
                    color: 'black', // Set default text color to black
                }}
                onSubmit={handleSubmit}
                noValidate
                autoComplete="off"
            >
                <h2>User Information</h2>
            
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
                            color: 'black', // Black input text
                        },
                        marginBottom: '5px', // Add bottom margin for spacing between fields
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
                            color: 'black', // Black input text
                        },
                        marginBottom: '5px', // Add bottom margin for spacing between fields
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
                        marginTop: '5px',
                        marginBottom: '5px', // Bottom margin for spacing from Date of Birth
                        '& .MuiInputBase-input': {
                            color: 'black', // Black input text
                        },
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
                            marginTop: '5px',
                            marginBottom: '10px', // Bottom margin for spacing
                            '& .MuiInputBase-input': {
                                color: 'black', // Black input text
                            },
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