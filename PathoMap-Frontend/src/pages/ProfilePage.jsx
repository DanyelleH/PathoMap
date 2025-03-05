import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import SavedDiseases from "../components/savedDiseases";
import RecentSymptoms from "../components/recentSymptoms";
import ProfileAvatar from "../components/profileAvatar";
import { Box, Button, Divider, Typography } from "@mui/material";

export default function Profile() {
  const { userToken } = useContext(UserContext);
  const navigate = useNavigate();

  const username = localStorage.getItem("userToken");

  const handleNavigate = () => {
    navigate(`/new-user/${username}`);
  };

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
        <ProfileAvatar />
      </Box>

      <Box display="flex" justifyContent="center" mb={3}>
        <Button onClick={handleNavigate} variant="contained">Click to update profile</Button>
      </Box>

      <Divider sx={{ marginBottom: 3 }} />

      <Box display="flex" justifyContent="space-between" gap={3} mb={3}>
        <Box border={1} borderColor="grey.300" padding={2} flex={1}>
          <Typography variant="h6">Saved Diseases</Typography>
          <SavedDiseases />
        </Box>

        <Box border={1} borderColor="grey.300" padding={2} flex={1}>
          <Typography variant="h6">Recent Symptoms</Typography>
          <RecentSymptoms />
        </Box>

      </Box>
    </>
  );
}