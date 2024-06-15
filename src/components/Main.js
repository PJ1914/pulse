import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box, Button, CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import './Main.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#000000',
    },
    primary: {
      main: '#2196f3',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#1c1c1c',
        },
      },
    },
  },
});

const Main = ({ data }) => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Pulse Dashboard
          </Typography>
          <Box ml="auto">
          <Link to="/login">
            <Button color="inherit">Login</Button>
          </Link>
          </Box>
        </Toolbar>
      </AppBar>

      <Container>
        {/* Main Content */}
      <Box my={4} textAlign="center">
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to Pulse AI
        </Typography>
        <Typography variant="body1" paragraph>
          Experience the next wave of technology with Pulse AI. Our innovative platform harnesses the power of artificial intelligence to bring you intuitive, intelligent solutions that simplify your daily life. From real-time insights to personalized AI assistance, Pulse AI transforms the way you interact with technology.
        </Typography>
      </Box>

      {/* About Pulse AI */}
      <Box my={4} textAlign="center">
        <Typography variant="h5" component="h2" gutterBottom>
          About Pulse AI
        </Typography>
        <Typography variant="body1" paragraph>
          Pulse AI was created by Pranay Jumbarthi, a passionate full-stack developer and lifelong learner. His vision was to create a platform where AI could seamlessly blend with everyday tasks to make life easier and more productive.
        </Typography>
        <Typography variant="body1" paragraph>
          Our Mission: At Pulse AI, we aim to bring AI technology to everyone. We believe that artificial intelligence should be accessible, easy to use, and tailored to your needs. Our goal is to integrate AI into your daily routine, enhancing productivity and creativity with every interaction.
        </Typography>
      </Box>

      {/* Meet the Team */}
      <Box my={4} textAlign="center">
        <Typography variant="h5" component="h2" gutterBottom>
          Meet the Team
        </Typography>
        <Typography variant="body1" paragraph>
          Pranay Jumbarthi: The mastermind behind Pulse AI, Pranay is a full-stack developer with a love for learning and innovation. His expertise drives the platform's unique blend of technology and usability.
        </Typography>
        <Typography variant="body1" paragraph>
          Vishwa: A talented full-stack developer, Vishwa ensures that Pulse AI delivers a seamless user experience. His skills in both frontend and backend development make him a versatile member of the team.
        </Typography>
        <Typography variant="body1" paragraph>
          Tarik Ali: Our backend expert, Tarik excels at solving complex problems and streamlining data management. His contributions have been crucial in overcoming the challenges of AI integration.
        </Typography>
        <Typography variant="body1">
          Durga Prasad: Another skilled full-stack developer, Durga brings his technical prowess to the team, helping to build a robust and scalable platform that stands the test of time.
        </Typography>
      </Box>

      {/* What Pulse AI Can Do */}
      <Box my={4} textAlign="center">
        <Typography variant="h5" component="h2" gutterBottom>
          What Pulse AI Can Do
        </Typography>
        <Typography variant="body1" paragraph>
          Intelligent Features:
        </Typography>
        <Typography variant="body1">
          - AI Chatbot: Engage with our AI chatbot for real-time answers, assistance, and information. It's like having a personal assistant at your fingertips.
        </Typography>
        <Typography variant="body1">
          - Custom Widgets: Tailor your Pulse AI dashboard with widgets that suit your needs, from weather updates to news feeds and more.
        </Typography>
        <Typography variant="body1">
          - Easy Integration: Seamlessly connect Pulse AI with your existing systems and platforms for a cohesive, unified experience.
        </Typography>
      </Box>

      {/* Discover Pulse AI Intelligence */}
      <Box my={4} textAlign="center">
        <Typography variant="h5" component="h2" gutterBottom>
          Discover Pulse AI Intelligence
        </Typography>
        <Typography variant="body1" paragraph>
          Dive into Pulse AI Intelligence for advanced data analysis and smart technology solutions. Personalize your experience with interactive buttons and icons, making it easy to get exactly what you need from the platform.
        </Typography>
      </Box>

      {/* Learn More About Us */}
      <Box my={4} textAlign="center">
        <Typography variant="h5" component="h2" gutterBottom>
          Learn More About Us
        </Typography>
        <Typography variant="body1" paragraph>
          Scroll down to explore the technology behind Pulse AI and meet the team making it happen. Along the way, you'll find our AI chatbot ready to assist you and a deeper look into Pulse AI Intelligence—where innovation and interaction come together.
        </Typography>
      </Box>

        {/* Pulse AI Chat Bot */}
        <Box my={4} textAlign="center">
          <Typography variant="h5" component="h2" gutterBottom>
            Pulse AI Chat Bot
          </Typography>
          <Link to="/messages" style={{textDecoration: "none"}}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ChatBubbleIcon />}
            style={{ marginTop: '10px' }}
          >
            Open Chat Bot
          </Button>
          </Link>
        </Box>

        {/* Pulse AI Intelligence */}
        <Box my={4} textAlign="center">
          <Typography variant="h5" component="h2" gutterBottom>
            Pulse AI Intelligence
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SmartToyIcon />}
            style={{ marginTop: '10px' }}
          >
            Explore Intelligence
          </Button>
        </Box>
      </Container>

      {/* Footer */}
      <Box mt={5} py={3} bgcolor="background.paper" textAlign="center">
        <Typography variant="body2" color="textSecondary">
          © 2024 Pulse. All rights reserved.
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default Main;
