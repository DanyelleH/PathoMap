import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';

const UserInfoForm = ({ handleInputChange, formData, handleSubmit, errorMessage }) => {

    const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        dob: formData.dob,
      };
      
    return (
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
                    value={formData.firstName}
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
                    value={formData.lastName}
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
                    value={formData.email}
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
                        label="Date of Birth"
                        value={formData.dob}
                        onChange={handleInputChange}
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
    );
};

export default UserInfoForm;