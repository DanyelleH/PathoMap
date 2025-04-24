import React from 'react';
import { Box, Typography, Button, Container, Card, CardContent } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function AboutUs() {
  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Card
        sx={{
          borderRadius: 5,
          boxShadow: 4,
          background: 'linear-gradient(145deg, #f3e7ff, #e5d0f7)',
        }}
      >
        <CardContent>
          <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ color: '#6a11cb' }}>
            About the Developer
          </Typography>

          <Typography variant="body1" sx={{ mt: 2, lineHeight: 1.6 }}>
  Hi! I'm a former medical student turned software engineer on a mission to build tech that cares.
  I created <strong>PathoMap</strong> to help people access reliable medical insights and understand disease pathways more clearly —
  combining my background in biomedical science and public health with the power of technology.
</Typography>

<Typography variant="body1" sx={{ mt: 2, lineHeight: 1.6 }}>
  My goal is to develop tools that bridge healthcare and software — empowering patients, supporting informed decision-making, 
  and bringing more empathy into digital solutions. I specialize in full-stack development using Python, React, Django, and PostgreSQL, 
  and I'm currently expanding my skills with Java and Spring Boot.
</Typography>

<Typography variant="body1" sx={{ mt: 2 }}>
  When I’m not coding, I love spending time with my child, playing video games, and listening to music.
</Typography>

          <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              href="https://www.linkedin.com/in/danyellehenriquez"
              target="_blank"
              startIcon={<LinkedInIcon />}
              sx={{
                backgroundColor: '#0077b5',
                '&:hover': { backgroundColor: '#005f8d' },
                textTransform: 'none',
              }}
            >
              LinkedIn
            </Button>

            <Button
              variant="contained"
              color="inherit"
              href="https://github.com/danyelleh"
              startIcon={<GitHubIcon />}
              sx={{
                backgroundColor: '#333',
                color: '#fff',
                '&:hover': { backgroundColor: '#111' },
                textTransform: 'none',
              }}
            >
              GitHub
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}