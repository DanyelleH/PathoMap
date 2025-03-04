import * as React from 'react';
import { useNavigate } from "react-router-dom";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Paper from '@mui/material/Paper';


export default function FixedBottomNavigation(userToken, setUserToken) {
  const [value, setValue] = React.useState(0);
  
  const navigate = useNavigate()

  const handleLogout = () => {
    setUserToken(null)
    navigate("/home")
  }

  return (

      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} onClick={() => navigate("/")} />
          <BottomNavigationAction label="Disease Lookup" icon={<LibraryBooksIcon />} onClick={() => navigate("/diseaseLookup")}/>
          <BottomNavigationAction label="Symptom Search" icon={<MedicalServicesIcon />} onClick={() => navigate("/symptomSearch")} />
          <BottomNavigationAction label="My Profile" icon={<ManageAccountsIcon />} onClick={() => navigate("/profile")}/>
          
          {!userToken ? ( 
            <BottomNavigationAction label="Login" icon={<LoginIcon />} onClick={() => navigate("/login")} /> 
          ):(
           <BottomNavigationAction label="Logout" icon={<LogoutIcon />} onClick = {handleLogout} />
           )}
        </BottomNavigation>
      </Paper>
  );
}

