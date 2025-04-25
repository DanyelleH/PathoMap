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
import { getSavedSymptoms } from "../api/usersAPI";
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
  const [savedDiseaseList, setSavedDiseaseList] = useState(userInfo?.current_readings || []);
  const [savedSymptomList, setSavedSymptomList] = useState(userInfo?.saved_symptoms || []);

  useEffect(() => {
    async function fetchSavedDiseases() {
      if (username && token) {
        try {
          const data = await getSavedDiseases(username, token);
          setSavedDiseaseList(data || []);
        } catch (error) {
          console.error("Error fetching saved diseases:", error);
          setSavedDiseaseList([]);
        }
      } else {
        setSavedDiseaseList([]);
      }
    }
    fetchSavedDiseases();
  }, [username, token, savedDiseaseList]);

  useEffect(() => {
    async function fetchSavedSymptoms() {
      if (username && token) {
        try {
          const data = await getSavedSymptoms(username, token);
          setSavedSymptomList(data || []);

        } catch (error) {
          console.error("Error fetching saved symptoms:", error);
          setSavedSymptomList([]);
        }
      } else {
        setSavedSymptomList([]);
      }
    }
    fetchSavedSymptoms();
  }, [username, token, savedSymptomList]);

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

      <Box display="flex" flexDirection="column" gap={3} width="100%">
  {/* Saved Disease Searches Section */}
  <Card
    sx={{
      boxShadow: 4,
      borderRadius: 3,
      backgroundColor: "#f8f9fa",
      p: 2,
    }}
  >
    <CardContent>
      <Stack direction="row" alignItems="center" spacing={2} mb={2}>
        <LocalHospital sx={{ fontSize: 32, color: "#6f42c1" }} />
        <Typography variant="h5" fontWeight="bold">
          Saved Disease Searches
        </Typography>
      </Stack>
      <SavedList results={savedDiseaseList} setSavedDiseaseList={setSavedDiseaseList} />
    </CardContent>
  </Card>

  {/* Saved Symptom Searches Section */}
  <Card
    sx={{
      boxShadow: 4,
      borderRadius: 3,
      backgroundColor: "#e2e8f0",
      p: 2,
    }}
  >
    <CardContent>
      <Stack direction="row" alignItems="center" spacing={2} mb={2}>
        <HealthAndSafety sx={{ fontSize: 32, color: "#6f42c1" }} />
        <Typography variant="h5" fontWeight="bold">
          Saved Symptom Analysis
        </Typography>
      </Stack>
      <RecentSymptoms
        symptoms={savedSymptomList}
        setSavedSymptomList={setSavedSymptomList}
        handleOpenSymptomDialog={handleOpenSymptomDialog}
      />
    </CardContent>
  </Card>
</Box>
      {/* user profile update  */}
      <Dialog open={showProfileInfoDialog} onClose={handleCloseProfileInfoDialog} fullWidth maxWidth="sm" sx ={{}}>
        <DialogContent sx={{backgroundColor: "#94a3b8", opacity:5}}>
          <UserInfo closeDialog={handleCloseProfileInfoDialog} />
        </DialogContent>
      </Dialog>
        
      <Dialog
  sx={{ backdropFilter: "blur(6px)" }}
  fullWidth
  maxWidth="md"
  open={showSavedAnalysisDialog}
  onClose={handleCloseSymptomDialog}
>
  <DialogContent
    sx={{
      backgroundColor: "#F4F4FC",
      padding: 4,
      borderRadius: 2,
    }}
    dividers
  >
    {selectedSymptom && selectedSymptom.conditions ? (
      <Box>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Complaint
        </Typography>
        <Typography variant="body1" gutterBottom mb={4}>
          {selectedSymptom.summary}
        </Typography>

        {selectedSymptom.conditions.map((condition, index) => (
          <Card
            key={index}
            sx={{
              marginBottom: 3,
              padding: 3,
              boxShadow: 3,
              transition: "0.3s ease",
              backgroundColor: "#FFF1E6",
              borderLeft: "6px solid #C94C4C",
              "&:hover": {
                boxShadow: 6,
                transform: "translateY(-2px)",
              },
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                color="primary"
                gutterBottom
                fontWeight="bold"
              >
                {condition.name}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ fontStyle: "italic", marginBottom: 1 }}
              >
                Likelihood: {condition.likelihood}
              </Typography>
              <Typography variant="body2" sx={{ marginBottom: 1.5 }}>
                {condition.description}
              </Typography>
              <Typography variant="body2" sx={{ color: "#4A4A4A" }}>
                {selectedSymptom.recommendations}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    ) : (
      <Typography variant="body1">No symptom data selected.</Typography>
    )}
  </DialogContent>
</Dialog>
    </Container>
  );
}