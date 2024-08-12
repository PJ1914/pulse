import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  CssBaseline,
  Menu,
  MenuItem,
  Avatar,
  ThemeProvider,
  createTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import axios from 'axios';
import logo from '../assets/pulse_logo.png';
import backgroundImage from '../assets/main page/backgroundimg.png';
import MeetTheTeam from './Team/MeetTheTeam';
import robotHandImage from '../assets/main page/htggdjhdfg 1.png';
import circuitOverlay from '../assets/main page/surface.png';
import blackOverlay from '../assets/main page/Rectangle 12.png';
import AboutUs from './About-us/AboutUs';
import './Main.css';
import { auth } from '../config/config';
import Footer from './CopyRights/Footer';
import WhatPulseAiCanDo from './WhatPulse/WhatPulseAICanDo';
import TryPulse from './PulseComp/TryPulse';

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

const Main = () => {
  const nav = useNavigate();
  const [user, setUser] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const logOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      console.log('Sign-out successful.');
      nav('/login');
    } catch (error) {
      console.error('An error happened during sign-out:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      console.log('Google Sign-in successful.');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const handleGitHubSignIn = async () => {
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      console.log('GitHub Sign-in successful.');
    } catch (error) {
      console.error('Error signing in with GitHub:', error);
    }
  };

  const handleEmailSignIn = async () => {
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        console.log('User signed up successfully');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in successfully');
      }
      setLoginDialogOpen(false);
    } catch (error) {
      console.error('Error with email sign-in:', error);
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLoginDialogOpen = () => {
    setLoginDialogOpen(true);
  };

  const handleLoginDialogClose = () => {
    setLoginDialogOpen(false);
    setEmail('');
    setPassword('');
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className='mainFlex'>
        <AppBar position='sticky' sx={{ zIndex: 1201, padding: '10px' }}>
          <Toolbar sx={{ padding: 0.5 }}>
            <div className='logoDesign'>
              <img src={logo} alt='logo' />
              <Typography variant='h6' component='div' align='center'>
                Pulse AI
              </Typography>
            </div>
            <Box ml='auto'>
              {!user ? (
                <>
                  <Button color='inherit' onClick={handleGoogleSignIn}>Login with Google</Button>
                  <Button color='inherit' onClick={handleGitHubSignIn}>Login with GitHub</Button>
                  <Button color='inherit' onClick={handleLoginDialogOpen}>Login with Email</Button>
                </>
              ) : (
                <>
                  <Avatar
                    src={user.photoURL}
                    alt={user.displayName}
                    onClick={handleMenu}
                    style={{ cursor: 'pointer' }}
                  />
                  <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                    <MenuItem onClick={handleClose} component={Link} to='/profile'>
                      Profile
                    </MenuItem>
                    <MenuItem onClick={logOut}>Log out</MenuItem>
                  </Menu>
                </>
              )}
            </Box>
          </Toolbar>
        </AppBar>

        <Dialog open={loginDialogOpen} onClose={handleLoginDialogClose}>
          <DialogTitle>{isSignUp ? 'Sign Up' : 'Sign In'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin='dense'
              label='Email Address'
              type='email'
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin='dense'
              label='Password'
              type='password'
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleLoginDialogClose}>Cancel</Button>
            <Button onClick={handleEmailSignIn}>{isSignUp ? 'Sign Up' : 'Sign In'}</Button>
          </DialogActions>
        </Dialog>

        <div
          className='hero-section'
          style={{
            backgroundImage: `url(${blackOverlay}), url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
          }}
        >
          <div className='content'>
            <img src={circuitOverlay} alt='Circuit Overlay' className='circuit-overlay' />
            <img src={robotHandImage} alt='Robot Hand' className='robot-hand' />
            <div className='circuit-text'>Pulse AI</div>
            <h1 className='typing'>Welcome to</h1>
            <p className='fade-in-text'>
              Experience the next wave of technology with Pulse AI. Our innovative platform harnesses the power of
              artificial intelligence to bring you intuitive, intelligent solutions that simplify your daily life. From
              real-time insights to personalized AI assistance, Pulse AI transforms the way you interact with
              technology.
            </p>
            <div className='buttons'>
              <Link to='/messages' style={{ textDecoration: 'none' }}>
                <button className='animated-button' onClick={() => console.log('Chatbot Opened')}>
                  Open Chatbot
                </button>
              </Link>
              <Link to='/voice' style={{ textDecoration: 'none' }}>
                <button className='animated-button' onClick={() => console.log('Exploring Intelligence')}>
                  Explore Intelligence
                </button>
              </Link>
            </div>
          </div>
        </div>
        <AboutUs />
        <MeetTheTeam />
        <WhatPulseAiCanDo />
        <TryPulse/>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Main;
