import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, CardContent, Divider, Stack, Typography, Container, Collapse } from "@mui/material";
import ProfileAvatar from "../components/profileAvatar";
import SavedList from "../components/savedLists";
import RecentSymptoms from "../components/recentSymptoms";
import { getSavedDiseases } from "../api/usersAPI";
import UserContext from "../contexts/UserContext";

import { LocalHospital, HealthAndSafety, ExpandMore } from '@mui/icons-material';

export default function Profile() {
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);
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
      <Box display="flex" flexDirection="row" alignItems="center" mb={2} sx={{ maxWidth: 800, margin: '0 auto' }}>
        <ProfileAvatar first_name={userInfo.first_name} last_name={userInfo.last_name} />
        <Typography variant="h6" sx={{ marginLeft: 2, fontWeight: 'bold' }}>
          {username}
        </Typography>
      </Box>

      <Box display="flex" justifyContent="center" mb={2}>
        <Button
          variant="text"
          sx={{ fontSize: '0.9rem', textTransform: 'none' }}
          onClick={handleToggleInfo}
          startIcon={<ExpandMore />}
        >
          {showInfo ? "Hide Information" : "Show Information"}
        </Button>
      </Box>

      <Collapse in={showInfo} sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
  <Card sx={{ boxShadow: 3, borderRadius: 2, padding: 1, width: "100%" }}>
          <CardContent sx={{ padding: 2 }}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              User Information
            </Typography>
            <Stack spacing={1.5}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" fontWeight="bold">Name:</Typography>
                <Typography variant="body2">
                  {userInfo.first_name || "Not provided"} {userInfo.last_name || ""}
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" fontWeight="bold">Email:</Typography>
                <Typography variant="body2">{userInfo.email || "Not provided"}</Typography>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" fontWeight="bold">Date of Birth:</Typography>
                <Typography variant="body2">{userInfo.dob || "Not provided"}</Typography>
              </Box>
            </Stack>

            <Box display="flex" justifyContent="center" mt={2}>
              <Button onClick={handleNavigate} variant="contained" sx={{ paddingX: 3 }}>
                Update Profile
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Collapse>

      <Divider sx={{ marginY: 3 }} />

      <Box display="flex" flexDirection="column" gap={3} sx={{ width: "100%" }}>
        <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2}>
              <LocalHospital color="primary" sx={{ fontSize: 36 }} />
              <Typography variant="h6" gutterBottom>Saved Diseases</Typography>
            </Box>
            <SavedList results={saved_list} setSavedList={setSavedList} />
          </CardContent>
        </Card>

        <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2}>
              <HealthAndSafety color="secondary" sx={{ fontSize: 36 }} />
              <Typography variant="h6" gutterBottom>Recent Symptoms</Typography>
            </Box>
            <RecentSymptoms results={savedSymptomList} setSavedSymptomList={setSavedSymptomList} />
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}