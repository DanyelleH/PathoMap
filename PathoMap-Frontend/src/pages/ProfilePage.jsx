import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, CardContent, Divider, Stack, Typography, Container, Collapse } from "@mui/material";
import ProfileAvatar from "../components/profileAvatar";
import SavedList from "../components/savedLists";
import RecentSymptoms from "../components/recentSymptoms";
import { getSavedDiseases } from "../api/usersAPI";
import UserContext from "../contexts/UserContext";

import { LocalHospital, HealthAndSafety, ExpandMore } from '@mui/icons-material'; // Updated icons

export default function Profile() {
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false); // Toggle state for user information
  const userInfo = JSON.parse(localStorage.getItem("userProfile"));
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("userToken");

  const [saved_list, setSavedList] = useState(userInfo?.current_readings || []);
  const [savedSymptomList, setSavedSymptomList] = useState(userInfo?.saved_symptoms || [])

  useEffect(() => {
    async function fetchSavedDiseases() {
      if (username && token) {
        try {
          const data = await getSavedDiseases(username, token);
          setSavedList(data || []);
        } catch (error) {
          console.error("Error fetching saved diseases:", error);
          setSavedList([]);
        }
      } else {
        setSavedList([]);
      }
    }
    fetchSavedDiseases();
  }, [username, token]);

  const handleNavigate = () => {
    navigate(`/new-user/${username}`);
  };

  const handleToggleInfo = () => {
    setShowInfo(prev => !prev);
  };

  return (
    <Container maxWidth="md" sx={{ padding: 3 }}>
      {/* Avatar and User Information Section */}
      <Box display="flex" flexDirection="row" alignItems="center" mb={4} sx={{ maxWidth: 800, margin: '0 auto' }}>
        {/* Profile Avatar */}
        <ProfileAvatar first_name={userInfo.first_name} last_name={userInfo.last_name} />

        {/* Username Display */}
        <Typography variant="h6" sx={{ marginLeft: 2, fontWeight: 'bold' }}>
          {username}
        </Typography>
      </Box>

      {/* Show Information Button */}
      <Box display="flex" justifyContent="center" mb={2}>
        <Button
          variant="text"
          sx={{ fontSize: '1rem', textTransform: 'none' }}
          onClick={handleToggleInfo}
          startIcon={<ExpandMore />}
        >
          {showInfo ? "Hide Information" : "Show Information"}
        </Button>
      </Box>

      {/* User Information Card (Toggled) */}
      <Collapse in={showInfo}>
        <Card sx={{ boxShadow: 3, marginLeft: 3, borderRadius: 2, padding: 1, width: "100%", maxWidth: 450, height: 'auto' }}>
          <CardContent sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              User Information
            </Typography>
            <Stack spacing={2}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1" fontWeight="bold">Name:</Typography>
                <Typography variant="body1">
                  {userInfo.first_name || "Not provided"} {userInfo.last_name || ""}
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1" fontWeight="bold">Email:</Typography>
                <Typography variant="body1">{userInfo.email || "Not provided"}</Typography>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1" fontWeight="bold">Date of Birth:</Typography>
                <Typography variant="body1">{userInfo.dob || "Not provided"}</Typography>
              </Box>
            </Stack>

            {/* Update Profile Button */}
            <Box display="flex" justifyContent="center" mt={2}>
              <Button onClick={handleNavigate} variant="contained" sx={{ paddingX: 4 }}>
                Update Profile
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Collapse>

      <Divider sx={{ marginBottom: 3 }} />

      {/* Saved Diseases and Recent Symptoms Section */}
      <Box display="flex" flexDirection="column" gap={3} sx={{ width: "100%" }}>
        {/* Saved Diseases Card */}
        <Card sx={{ boxShadow: 3, marginBottom: 3, borderRadius: 2, '&:hover': { boxShadow: 6, transform: 'scale(1.02)' } }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2}>
              <LocalHospital color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="h6" gutterBottom>Saved Diseases</Typography>
            </Box>
            <SavedList results={saved_list} setSavedList={setSavedList} />
          </CardContent>
        </Card>

        {/* Recent Symptoms Card */}
        <Card sx={{ boxShadow: 3, marginBottom: 3, borderRadius: 2, '&:hover': { boxShadow: 6, transform: 'scale(1.02)' } }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2}>
              <HealthAndSafety color="secondary" sx={{ fontSize: 40 }} />
              <Typography variant="h6" gutterBottom>Recent Symptoms</Typography>
            </Box>
            <RecentSymptoms results={savedSymptomList} setSavedSymptomList={setSavedSymptomList} />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}