import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import ProfileAvatar from "../components/profileAvatar";
import SavedDiseases from "../components/savedLists";
import RecentSymptoms from "../components/recentSymptoms";
import Results from "../components/ResultsComponent";
import SavedList from "../components/savedLists";
import { getSavedDiseases } from "../api/usersAPI";
import { removeSavedDiseases } from "../api/usersAPI";
export default function Profile() {
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem("userProfile"));
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("userToken")

  const [saved_list, setSavedList] = useState(userInfo?.current_readings || [])


  useEffect(() => {
    async function fetchSavedDiseases() {
      if (username && token) {
        try {
          const data = await getSavedDiseases(username, token);
          setSavedList(data || []);
        } catch (error) {
          console.error("Error fetching saved diseases:", error);
        }
      }
    }

    fetchSavedDiseases();
  }, [username, token]);

  const handleNavigate = () => {
    navigate(`/new-user/${username}`);
  };

  return (
    <>
  
      <Box display="flex" flexDirection="column" alignItems="center">
        <ProfileAvatar />
      </Box>

   
      <Box sx={{ maxWidth: 400, mx: "auto", mt: 3 }}>
        <Button variant="contained" onClick={() => setShowInfo((prev) => !prev)}>
          {showInfo ? "Hide Profile Info" : "Show Profile Info"}
        </Button>

      
        {showInfo && userInfo && (
          <>
            <Card sx={{ mt: 2, p: 2, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  User Profile
                </Typography>
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

            <Box display="flex" justifyContent="center" mb={3}>
              <Button onClick={handleNavigate} variant="contained">
                Click to update profile
              </Button>
            </Box>
          </>
        )}
      </Box>

      <Divider sx={{ marginBottom: 3 }} />

      {/* Section for Saved Diseases and Recent Symptoms */}
      <Box display="flex" flexWrap="wrap" justifyContent="space-between" gap={3} mb={3} sx={{ width: "100%" }}>
        <Box border={1} borderColor="grey.300" padding={2} flex={1} minWidth={250}>
          <Typography variant="h6">Saved Diseases</Typography>
          <SavedList results={saved_list} setSavedList={setSavedList} />
        </Box>

        <Box border={1} borderColor="grey.300" padding={2} flex={1} minWidth={250}>
          <Typography variant="h6">Recent Symptoms</Typography>
          <RecentSymptoms />
        </Box>
      </Box>
    </>
  );
}