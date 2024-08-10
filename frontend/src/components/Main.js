// Main.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button, CssBaseline, Menu, MenuItem, Avatar } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { auth } from '../config/config';
import { signOut } from 'firebase/auth';
import axios from 'axios'; 
import logo from '../assets/pulse_logo.png';
import backgroundImage from '../assets/main page/backgroundimg.png';
import meet from '../assets/meet my team.png';
import { Grid, Card, CardContent, CardMedia } from '@mui/material';
import robotHandImage from '../assets/main page/htggdjhdfg 1.png';
import circuitOverlay from '../assets/main page/surface.png'; 
import blackOverlay from '../assets/main page/Rectangle 12.png';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import './Main.css';
import AboutUs from './About-us/AboutUs';

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
          backgroundColor: '#000000',
        },
      },
    },
  },
});

const Main = ({ data }) => {
  const nav = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

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

  const logOut = async () => {
    try {
      await signOut(auth);
      console.log("Sign-out successful.");
      nav('/login');
    } catch (error) {
      console.error("An error happened during sign-out:", error);
    }
  };

  const handleGitLogout = () => {
    axios.get('http://127.0.0.1/logout')
      .then(() => {
        setUser(null);
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
              ) : (
                <>
                  <Avatar src={user?.avatar_url || auth.currentUser.photoURL} alt={user?.name || auth.currentUser.displayName} onClick={handleMenu} style={{ cursor: 'pointer' }} />
                  <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose} component={Link} to="/profile">Profile</MenuItem>
                    <MenuItem onClick={user ? handleGitLogout : logOut}>Log out</MenuItem>
                  </Menu>
                </>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        
        <div className="hero-section" style={{ backgroundImage: `url(${blackOverlay}), url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
            <div className="content">
              <img src={circuitOverlay} alt="Circuit Overlay" className="circuit-overlay" />
              <img src={robotHandImage} alt="Robot Hand" style={{ position: 'absolute', right: 0, bottom: 0, width: '50%' }} />
              <div className="circuit-text">Pulse AI</div>
                <h1>Welcome to</h1>
                <p>Experience the next wave of technology with Pulse AI. Our innovative platform harnesses the power of artificial intelligence to bring you intuitive, intelligent solutions that simplify your daily life. From real-time insights to personalized AI assistance, Pulse AI transforms the way you interact with technology.</p>
                <div className="buttons">
                  <Link to="/messages" style={{ textDecoration: 'none' }}>
                    <button onClick={() => console.log('Chatbot Opened')}>Open Chatbot</button>
                  </Link>
                  <Link to="/voice" style={{ textDecoration: 'none' }}>
                    <button onClick={() => console.log('Exploring Intelligence')}>Explore Intelligence</button>
                  </Link>
              </div>
            </div>
        </div>
        <AboutUs />
      </div>
    </ThemeProvider>
  );
};

export default Main;
