import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Paper from "@mui/material/Paper";
import UserContext from "../contexts/UserContext";

export default function FixedBottomNavigation() {
  const { handleLogout } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const userToken = localStorage.getItem("userToken");

  const pathToValue = {
    "/": 0,
    "/diseaseLookup": 1,
    "/symptomSearch": 2,
    "/profile": 3,
    "/login": 4,
  };
  const valueToPath = {
    0: "/",
    1: "/diseaseLookup",
    2: "/symptomSearch",
    3: "/profile",
    4: "/login",
  };

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "linear-gradient(135deg, #1976d2, #42a5f5)", // Blue gradient
        color: "white",
        boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.2)",
        borderRadius: "10px 10px 0 0",
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={pathToValue[location.pathname] || 0}
        onChange={(event, newValue) => {
          const route = valueToPath[newValue];
          if (route) {
            handleNavigation(route);
          }
        }}
        sx={{
          background: "transparent",
          color: "white",
          "& .Mui-selected": {
            color: "#ffeb3b", // Highlight selected item
          },
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeIcon sx={{ fontSize: "30px" }} />}
          value={0}
          sx={{ color: "white", "&:hover": { color: "#ffeb3b" } }}
        />
        <BottomNavigationAction
          label="Disease Lookup"
          icon={<LibraryBooksIcon sx={{ fontSize: "30px" }} />}
          value={1}
          sx={{ color: "white", "&:hover": { color: "#ffeb3b" } }}
        />
        <BottomNavigationAction
          label="Symptom Search"
          icon={<MedicalServicesIcon sx={{ fontSize: "30px" }} />}
          value={2}
          sx={{ color: "white", "&:hover": { color: "#ffeb3b" } }}
        />
        {userToken && (
        <BottomNavigationAction
          label="My Profile"
          icon={<ManageAccountsIcon sx={{ fontSize: "30px" }} />}
          value={3}
          sx={{ color: "white", "&:hover": { color: "#ffeb3b" } }}
        />)}

        {!userToken ? (
          <BottomNavigationAction
            label="Login"
            icon={<LoginIcon sx={{ fontSize: "30px" }} />}
            value={4}
            sx={{ color: "white", "&:hover": { color: "#ffeb3b" } }}
          />
        ) : (
          <BottomNavigationAction
            label="Logout"
            icon={<LogoutIcon sx={{ fontSize: "30px" }} />}
            onClick={handleLogout}
            sx={{ color: "white", "&:hover": { color: "#ffeb3b" } }}
          />
        )}
      </BottomNavigation>
    </Paper>
  );
}