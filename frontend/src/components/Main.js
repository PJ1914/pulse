import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box, Button, CssBaseline, Card, CardContent, CardMedia, Grid } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { auth } from '../config/config';
import { signOut } from 'firebase/auth';
import logo from '../assets/pulse_logo.png';
import welcome from '../assets/welcome.png';
import meet from '../assets/meet my team.png';
import about from '../assets/About Pulse.png';
import axios from 'axios';
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
  const nav = useNavigate();
  const logOut = async () => {
    try {
      await signOut(auth);
      console.log("Sign-out successful.");
      nav('/login');
    } catch (error) {
      console.error("An error happened during sign-out:", error);
    }
  };
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('token');

    if (accessToken) {
      setToken(accessToken);
      axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then(response => {
        setUser(response.data);
      }).catch(error => {
        console.error('Error fetching user:', error);
      });
    }
  }, []);

  const handleGitLogout = () => {
    axios.get('http://127.0.0.1/logout')
      .then(() => {
        setUser(null);
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  };

  const teamMembers = [
    { name: 'Pranay Jumbarthi', role: 'Full-stack Developer', description: 'The mastermind behind Pulse AI, Pranay is a full-stack developer with a love for learning and innovation.', image: meet },
    { name: 'Vishwa', role: 'Full-stack Developer', description: 'Ensures that Pulse AI delivers a seamless user experience.', image: meet },
    { name: 'Tarik Ali', role: 'Backend Expert', description: 'Excels at solving complex problems and streamlining data management.', image: meet },
    { name: 'Durga Prasad', role: 'Full-stack Developer', description: 'Helps to build a robust and scalable platform.', image: meet }
  ];

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {/* Header */}
      <div className='mainFlex'>
        <AppBar position="sticky" sx={{ zIndex: 1201, padding: '10px' }}>
          <Toolbar sx={{ padding: 0.5 }}>
            <div className='logoDesign'>
              <img src={logo} alt="logo" />
              <Typography variant="h6" component="div" align="center">
                Pulse Dashboard
              </Typography>
            </div>
            <Box ml="auto">
              {!(auth.currentUser || user) ? (
                <Link to="/login">
                  <Button color="inherit">Login</Button>
                </Link>
              ) : user ? (
                <Button color="inherit" onClick={handleGitLogout}>Log out</Button>
              ) : (
                <Button color="inherit" onClick={logOut}>Log out</Button>
              )}
            </Box>
          </Toolbar>
        </AppBar>

        <Container className="contain">
          <Box className="box welcome-box">
            <Typography variant="h4" component="h1" className="typography" gutterBottom>Welcome to Pulse AI</Typography>
            <div className="imgFlex">
              <div>
                <Typography>Experience the next wave of technology with Pulse AI. Our innovative platform harnesses the power of artificial intelligence to bring you intuitive, intelligent solutions that simplify your daily life. From real-time insights to personalized AI assistance, Pulse AI transforms the way you interact with technology.</Typography>
              </div>
              <img src={welcome} alt="welcome" id="wel" />
            </div>
          </Box>

          <Box className="box">
            <Typography variant="h5" component="h2" className="typography" gutterBottom>About Pulse AI</Typography>
            <div className="imgFlex">
              <div>
                <Typography>Pulse AI was created by Pranay Jumbarthi, a passionate full-stack developer and lifelong learner. His vision was to create a platform where AI could seamlessly blend with everyday tasks to make life easier and more productive.</Typography>
                <Typography>Our Mission: At Pulse AI, we aim to bring AI technology to everyone. We believe that artificial intelligence should be accessible, easy to use, and tailored to your needs. Our goal is to integrate AI into your daily routine, enhancing productivity and creativity with every interaction.</Typography>
              </div>
              <img src={about} alt="about" />
            </div>
          </Box>

          <Box className="box">
            <Typography variant="h5" component="h2" className="typography" gutterBottom>Meet the Team</Typography>
            <Grid container spacing={2}>
              {teamMembers.map(member => (
                <Grid item xs={12} sm={6} md={3} key={member.name}>
                  <Card className="teamCard">
                    <CardMedia
                      component="img"
                      height="140"
                      image={member.image}
                      alt={member.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">{member.name}</Typography>
                      <Typography variant="body2" color="textSecondary">{member.role}</Typography>
                      <Typography variant="body2" color="textSecondary">{member.description}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box className="box">
            <Typography variant="h5" component="h2" className="typography" gutterBottom>What Pulse AI Can Do</Typography>
            <ul style={{ "listStyle": "none", "padding": 0 }}>
              <li>AI Chatbot: Engage with our AI chatbot for real-time answers, assistance, and information. It's like having a personal assistant at your fingertips.</li>
              <li>Custom Widgets: Tailor your Pulse AI dashboard with widgets that suit your needs, from weather updates to news feeds and more.</li>
              <li>Easy Integration: Seamlessly connect Pulse AI with your existing systems and platforms for a cohesive, unified experience.</li>
            </ul>
          </Box>

          <Box className="box">
            <Typography variant="h5" component="h2" className="typography" gutterBottom>Discover Pulse AI Intelligence</Typography>
            <div className="imgFlex">
              <div>
                <Typography>Dive into Pulse AI Intelligence for advanced data analysis and smart technology solutions. Personalize your experience with interactive buttons and icons, making it easy to get exactly what you need from the platform.</Typography>
              </div>
            </div>
          </Box>

          <Box className="box">
            <Typography variant="h5" component="h2" className="typography" gutterBottom>Learn More About Us</Typography>
            <div className="imgFlex">
              <div>
                <Typography>Scroll down to explore the technology behind Pulse AI and meet the team making it happen. Along the way, you'll find our AI chatbot ready to assist you and a deeper look into Pulse AI Intelligence—where innovation and interaction come together.</Typography>
              </div>
            </div>
          </Box>

          <Box my={4} textAlign="center">
            <Typography variant="h5" component="h2" gutterBottom>Pulse AI Chat Bot</Typography>
            <Link to="/messages" style={{ textDecoration: "none" }}>
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

          <Box my={4} textAlign="center">
            <Typography variant="h5" component="h2" gutterBottom>PULSE AI INTELLIGENCE</Typography>
            <Link to="/voice" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SmartToyIcon />}
                style={{ marginTop: '10px' }}
              >
                Explore Intelligence
              </Button>
            </Link>
          </Box>

          <Box mt={5} py={3} bgcolor="background.paper" textAlign="center">
            <Typography variant="body2" color="textSecondary">
              © 2024 Pulse. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default Main;
