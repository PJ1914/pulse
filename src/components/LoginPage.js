// src/components/LoginPage.js
import React from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { Google as GoogleIcon, Facebook as FacebookIcon, GitHub as GitHubIcon } from '@mui/icons-material';
import { primaryColors, accentColors, backgroundColors } from '../components/styles/Colors';

const LoginPage = () => {
  return (
    <Container 
      maxWidth="sm" 
      sx={{ 
        backgroundColor: backgroundColors.black, 
        color: '#FFF', 
        padding: '20px', 
        borderRadius: '10px', 
        textAlign: 'center',
        marginTop: '100px'
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: '20px', color: primaryColors.tealBlue }}>
        PULSE AI Login
      </Typography>
      <TextField 
        label="Email" 
        type='password'
        variant="outlined" 
        fullWidth 
        InputProps={{
          sx: { 
            backgroundColor: backgroundColors.black, 
            color: '#FFF',
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: primaryColors.tealBlue,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: accentColors.orange,
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: primaryColors.tealBlue,
            },
          },
        }}
        InputLabelProps={{
          sx: { 
            color: '#FFF' 
          }
        }}
        sx={{ 
          marginBottom: '20px', 
        }}
      />
      <TextField 
        label="Password" 
        type="password" 
        variant="outlined" 
        fullWidth 
        InputProps={{
          sx: { 
            backgroundColor: backgroundColors.black, 
            color: '#FFF',
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: primaryColors.tealBlue,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: accentColors.orange,
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: primaryColors.tealBlue,
            },
          },
        }}
        InputLabelProps={{
          sx: { 
            color: '#FFF' 
          }
        }}
        sx={{ 
          marginBottom: '20px', 
        }}
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
        Log In
      </Button>
      <Typography variant="body2" sx={{ marginBottom: '20px' }}>or login with</Typography>
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

export default LoginPage;
