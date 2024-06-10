// src/components/SignupPage.js
import {React,useState} from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { Google as GoogleIcon, Facebook as FacebookIcon, GitHub as GitHubIcon } from '@mui/icons-material';
import { primaryColors, accentColors, backgroundColors } from '../components/styles/Colors';
import {useNavigate} from 'react-router-dom'
import {toast,ToastContainer} from 'react-toastify'
import { createUserWithEmailAndPassword ,
    GoogleAuthProvider,signInWithPopup} from 'firebase/auth';
import {auth} from '../config/config.js'

const SignupPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = async (e) => {
      e.preventDefault();
      try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          // Signed up successfully
          const user = userCredential.user;
          console.log('Signed up successfully:', user);
          toast('Signed up successfully')
          navigate('/main')
      } catch (error) {
          console.error('Error signing up:', error);
          toast.error('Fill the details')
      }
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const userCredential = await signInWithPopup(auth, provider);
        // Signed up with Google successfully
        const user = userCredential.user;
        console.log('Signed up with Google successfully:', user);
        toast('Signed up successfully')
        navigate('/main')
    } catch (error) {
        console.error('Error signing up with Google:', error);
    }
};


  return (
    <Container 
      maxWidth="sm" 
      sx={{ 
        backgroundColor: backgroundColors.darkSlateGray, 
        color: '#FFF', 
        padding: '20px', 
        borderRadius: '10px', 
        textAlign: 'center',
        marginTop: '100px'
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: '20px', color: primaryColors.tealBlue }}>
        PULSE AI Sign Up
      </Typography>
      {/* Removed name because user auth becomes simple */}
      {/* <TextField 
        label="Name" 
        variant="outlined" 
        fullWidth 
        sx={{ marginBottom: '20px', input: { color: '#FFF' }, label: { color: '#FFF' } }}
      /> */}
      <TextField 
        label="Email" 
        variant="outlined" 
        fullWidth 
        sx={{ marginBottom: '20px', input: { color: '#FFF' }, label: { color: '#FFF' } }}
        onChange={handleEmailChange}/>
      <TextField 
        label="Password" 
        type="password" 
        variant="outlined" 
        fullWidth 
        sx={{ marginBottom: '20px', input: { color: '#FFF' }, label: { color: '#FFF' } }}
        onChange={handlePasswordChange}/>
      <Button 
        variant="contained" 
        fullWidth 
        sx={{ 
          backgroundColor: primaryColors.tealBlue, 
          '&:hover': { backgroundColor: primaryColors.deepGreen }, 
          marginBottom: '20px' 
        }}
      onClick={handleSignup}>
        Sign Up
      </Button>
      <Typography variant="body2" sx={{ marginBottom: '20px' }}>or sign up with</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" startIcon={<GoogleIcon />} onClick={handleGoogleSignup} sx={{ backgroundColor: accentColors.orange, flex: 1, marginRight: '10px' }}>
          Google
        </Button>
        <Button variant="contained" startIcon={<FacebookIcon />} sx={{ backgroundColor: accentColors.slateBlue, flex: 1, marginRight: '10px' }}>
          Facebook
        </Button>
        <Button variant="contained" startIcon={<GitHubIcon />} sx={{ backgroundColor: primaryColors.steelGray, flex: 1 }}>
          GitHub
        </Button>
      </Box>
    </Container>
  );
};

export default SignupPage;
