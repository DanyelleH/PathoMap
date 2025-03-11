import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, CardContent, Divider, Stack, Typography, Container } from "@mui/material";
import ProfileAvatar from "../components/profileAvatar";
import SavedList from "../components/savedLists";
import RecentSymptoms from "../components/recentSymptoms";
import { getSavedDiseases } from "../api/usersAPI";
import UserContext from "../contexts/UserContext";

export default function Profile() {
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userProfile"));
  // const {userInfo} = useContext(UserContext)
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("userToken");

  const [saved_list, setSavedList] = useState(userInfo?.current_readings || []);

  useEffect(() => {
    async function fetchSavedDiseases() {
      if (username && token) {
        try {
          const data = await getSavedDiseases(username, token);
          setSavedList(data || []);
        } catch (error) {
          console.error("Error fetching saved diseases:", error);
          setSavedList([])
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

  return (
    <Container maxWidth="md" sx={{ padding: 3 }}>
      {/* Avatar and Profile Info Button */}
      <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
        <ProfileAvatar first_name={userInfo.first_name} last_name={userInfo.last_name}/>
      </Box>

      {/* Profile Info Button */}
      <Box sx={{ textAlign: "center" }}>
        <Button
          variant="contained"
          onClick={() => setShowInfo((prev) => !prev)}
          sx={{
            marginBottom: 3,
            '&:hover': { transform: 'scale(1.05)' },
          }}
        >
          {showInfo ? "Hide Profile Info" : "Show Profile Info"}
        </Button>
      </Box>

      {/* Profile Info Card */}
      {showInfo && userInfo && (
        <Card sx={{ p: 3, boxShadow: 3, marginBottom: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>User Profile</Typography>
            <Stack spacing={1}>
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
          </CardContent>
        </Card>
      )}

      {/* Update Profile Button */}
      {showInfo && userInfo && (
        <Box display="flex" justifyContent="center" mb={4}>
          <Button onClick={handleNavigate} variant="contained" sx={{ paddingX: 4 }}>
            Update Profile
          </Button>
        </Box>
      )}

      <Divider sx={{ marginBottom: 3 }} />

      {/* Saved Diseases and Recent Symptoms Section */}
      <Box display="flex" flexDirection="column" gap={3} sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "space-between",
            mb: 3,
            width: "100%",
          }}
        >
          <Box
            sx={{
              border: "1px solid #ccc",
              padding: 3,
              flex: 1,
              minWidth: 250,
              borderRadius: 2,
              boxShadow: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Saved Diseases
            </Typography>
            <SavedList results={saved_list} setSavedList={setSavedList} />
          </Box>

          <Box
            sx={{
              border: "1px solid #ccc",
              padding: 3,
              flex: 1,
              minWidth: 250,
              borderRadius: 2,
              boxShadow: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Recent Symptoms
            </Typography>
            <RecentSymptoms />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}