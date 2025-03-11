import React, {useContext } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Paper from '@mui/material/Paper';
import UserContext from '../contexts/UserContext';

export default function FixedBottomNavigation() {
  const { handleLogout} = useContext(UserContext)
  const navigate = useNavigate()
  const location = useLocation()
const userToken = localStorage.getItem("userToken")
  const pathToValue = {
    '/': 0,
    '/diseaseLookup': 1,
    '/symptomSearch': 2,
    '/profile': 3,
    '/login': 4,
  };
  const valueToPath = {
    0: '/',
    1: '/diseaseLookup',
    2: '/symptomSearch',
    3: '/profile',
    4: '/login',
  }

  const handleNavigation = (route) => {
    navigate(route);
  };
  
  return (

      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={pathToValue[location.pathname] || 0}
          onChange={(event, newValue) => {
            const route = valueToPath[newValue]; // Use newValue to get the correct path
          if (route) {
            handleNavigation(route); // Navigate to the corresponding route
          }
          }}
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} value={0} />
          <BottomNavigationAction label="Disease Lookup" icon={<LibraryBooksIcon />} value={1} />
          <BottomNavigationAction label="Symptom Search" icon={<MedicalServicesIcon />} value={2} />
          <BottomNavigationAction label="My Profile" icon={<ManageAccountsIcon />}  value={3} />
          
          {!userToken ? ( 
            <BottomNavigationAction label="Login" icon={<LoginIcon />} value={4} /> 
          ):(
           <BottomNavigationAction label="Logout" icon={<LogoutIcon />} onClick = {handleLogout} />
           )}
        </BottomNavigation>
      </Paper>
  );
}

