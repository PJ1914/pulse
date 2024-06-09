// src/components/SignupPage.js
import React from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { Google as GoogleIcon, Facebook as FacebookIcon, GitHub as GitHubIcon } from '@mui/icons-material';
import { primaryColors, accentColors, backgroundColors } from '../components/styles/Colors';

const SignupPage = () => {
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
      <TextField 
        label="Name" 
        variant="outlined" 
        fullWidth 
        sx={{ marginBottom: '20px', input: { color: '#FFF' }, label: { color: '#FFF' } }}
      />
      <TextField 
        label="Email" 
        variant="outlined" 
        fullWidth 
        sx={{ marginBottom: '20px', input: { color: '#FFF' }, label: { color: '#FFF' } }}
      />
      <TextField 
        label="Password" 
        type="password" 
        variant="outlined" 
        fullWidth 
        sx={{ marginBottom: '20px', input: { color: '#FFF' }, label: { color: '#FFF' } }}
      />
      <Button 
        variant="contained" 
        fullWidth 
        sx={{ 
          backgroundColor: primaryColors.tealBlue, 
          '&:hover': { backgroundColor: primaryColors.deepGreen }, 
          marginBottom: '20px' 
        }}
      >
        Sign Up
      </Button>
      <Typography variant="body2" sx={{ marginBottom: '20px' }}>or sign up with</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" startIcon={<GoogleIcon />} sx={{ backgroundColor: accentColors.orange, flex: 1, marginRight: '10px' }}>
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
