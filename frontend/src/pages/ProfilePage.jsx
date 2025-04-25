import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, CardContent, Divider, Stack, Typography, Container, Collapse } from "@mui/material";
import ProfileAvatar from "../components/profileAvatar";
import SavedList from "../components/savedLists";
import RecentSymptoms from "../components/recentSymptoms";
import { getSavedDiseases } from "../api/usersAPI";
import UserContext from "../contexts/UserContext";
import { useTheme } from "../contexts/themeContext";
import { LocalHospital, HealthAndSafety, ExpandMore } from '@mui/icons-material';
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import UserInfo from "./UserInformation";

export default function Profile() {
  const navigate = useNavigate();
  const [showInfo, setShowInfo] = useState(false);
  const [selectedSymptom, setSelectedSymptom] = useState(null);
  const [showProfileInfoDialog, setShowProfileInfoDialog] = useState(false);
  const [showSavedAnalysisDialog, setShowSavedAnalysisDialog] = useState(false)
  const userInfo = JSON.parse(localStorage.getItem("userProfile"));
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("userToken");
  const {theme} = useTheme();
  const [saved_list, setSavedList] = useState(userInfo?.current_readings || []);
  const [savedSymptomList, setSavedSymptomList] = useState(userInfo?.saved_symptoms || []);

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

  const handleOpenDialog = () => {
    setShowProfileInfoDialog(true);
  };
  
  const handleCloseProfileInfoDialog = () => {
    setShowProfileInfoDialog(false);
  };

  const handleOpenSymptomDialog = (item) => {
    setSelectedSymptom(item);
    setShowSavedAnalysisDialog(true);
  };

  const handleCloseSymptomDialog = () => {
    setShowSavedAnalysisDialog(false);
  };

  const handleToggleInfo = () => {
    setShowInfo(prev => !prev);
  };

  return (
    <Container maxWidth="md" sx={{ padding: 3 }}>

      <Box
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        alignItems="flex-start"
        justifyContent="space-between"
        width="100%"
        gap={5}
        mb={1}
      >
        {/* Left Side: Avatar & Greeting */}
        <ProfileAvatar first_name={userInfo.first_name} last_name={userInfo.last_name} />
        
        <Box flex={1}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Welcome back, {userInfo.first_name || "User"}!
          </Typography>

          <Typography variant="body1" sx={{ mb: 2 }}>
            Explore your personalized dashboard. You can view and update your profile, explore saved diseases, or review previous symptom analysis results.
          </Typography>

          <Button
            variant="outlined"
            onClick={handleToggleInfo}
            startIcon={
              <ExpandMore
                sx={{
                  transform: showInfo ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                }}
              />
            }
            sx={{
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '1rem',
              borderColor: 'primary.main',
              '&:hover': { backgroundColor: 'primary.light' },
            }}
          >
            {showInfo ? "Hide Profile Info" : "Show Profile Info"}
          </Button>
        </Box>

        {/* Right Side: Collapsible Profile Info */}
        <Collapse in={showInfo} orientation="horizontal" timeout={300}>
          <Card
            sx={{
              boxShadow: 4,
              borderRadius: 2,
              p: 2,
              pt: 0,
              minWidth: { xs: '100%', md: 300 },
              maxHeight: 185,
              backgroundColor: '#6C757D',
            }}
          >
            <CardContent>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}
              >
                User Information
              </Typography>

              <Stack spacing={1.5}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" fontWeight="bold" color="white">Name:</Typography>
                  <Typography variant="body2" color="white">
                    {userInfo.first_name || "Not provided"} {userInfo.last_name || ""}
                  </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" fontWeight="bold" color="white">Email:</Typography>
                  <Typography variant="body2" color="white">{userInfo.email || "Not provided"}</Typography>
                </Box>

                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" fontWeight="bold" color="white">Date of Birth:</Typography>
                  <Typography variant="body2" color="white">{userInfo.dob || "Not provided"}</Typography>
                </Box>
              </Stack>

              <Box display="flex" justifyContent="center" mt={2}>
                <Button variant="contained" onClick={handleOpenDialog} sx={{ px: 3 }}>
                  Update Profile
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Collapse>
      </Box>

      <Divider sx={{ marginY: 2 }} />

      {/* Saved Disease Searches Section */}
      <Box display="flex" flexDirection="column" gap={3} sx={{ width: "100%" }}>
        <Card sx={{ boxShadow: 3, borderRadius: 2, backgroundColor: "#E9ECEF" }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2}>
              <LocalHospital sx={{ fontSize: 30, color: "purple" }} />
              <Typography variant="h5" fontWeight="bold">Saved Disease Searches</Typography>
            </Box>
            <SavedList results={saved_list} setSavedList={setSavedList} />
          </CardContent>
        </Card>

        {/* Saved Symptom Searches Section */}
        <Card sx={{ boxShadow: 3, borderRadius: 2, backgroundColor: "#E9ECEF" }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2}>
              <HealthAndSafety sx={{ fontSize: 30, color: "purple" }} />
              <Typography variant="h5" fontWeight="bold">Saved Symptom Analysis</Typography>
            </Box>
            <RecentSymptoms results={savedSymptomList} setSavedSymptomList={setSavedSymptomList} handleOpenSymptomDialog={handleOpenSymptomDialog} />
          </CardContent>
        </Card>
      </Box>

      {/* Profile Update Dialog */}
      <Dialog open={showProfileInfoDialog} onClose={handleCloseProfileInfoDialog} fullWidth maxWidth="sm">
        <DialogContent sx={{ backgroundColor: "#6C757D" }}>
          <UserInfo closeDialog={handleCloseProfileInfoDialog} />
        </DialogContent>
      </Dialog>

      {/* Symptom Prediction Dialog */}
      <Dialog sx={{ backdropFilter: "blur(6px)" }} fullWidth maxWidth="md" open={showSavedAnalysisDialog} onClose={handleCloseSymptomDialog}>
        <DialogContent sx={{ backgroundColor: "#C6CAED" }} dividers>
          {selectedSymptom ? (
            <Box>
              <Typography variant="body1" gutterBottom>
                <strong>Complaint:</strong> {selectedSymptom.summary}
              </Typography>

              {selectedSymptom.conditions.map((condition, index) => (
                <Card
                  key={index}
                  sx={{
                    marginBottom: 2,
                    padding: 2,
                    boxShadow: 3,
                    transition: "0.3s",
                    backgroundColor: "#FFDDD2",
                    "&:hover": { boxShadow: 9, transform: "scale(1.02)" }
                  }}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                      <Typography variant="h5" fontWeight="bold">
                        Condition: {condition.name} <br /> Likelihood: {condition.likelihood}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Description: {condition.description} <br />
                      {selectedSymptom.recommendations}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          ) : (
            <Typography>No symptom data selected.</Typography>
          )}
        </DialogContent>
      </Dialog>

    </Container>
  );
}