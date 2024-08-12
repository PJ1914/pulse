import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../../config/config';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons'; // Ensure these are the modern versions
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import pulseLogo from '../../assets/Login/LogoPulse.png'; // Adjust the path as necessary
import Logo1 from '../../assets/Login/Logo11.png';
import Logo2 from '../../assets/Login/Logo22.png';
import Logo3 from '../../assets/Login/Logo33.png';


import LoginCarosual from './LoginCarosual';

const Logos = [Logo1, Logo2, Logo3];
let index = 0;
let logo = Logos[index];

setInterval(() => {
  index = (index + 1) % Logos.length;
  logo = Logos[index];
  console.log(index, logo);
}, 3000);

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('../../assets/Login/LoginBGG.png'); 
`;

const PanelWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 80%;
  justify-content: center;
  align-items: stretch;
`;

const FormWrapper = styled.div`
  background: white;
  padding: 40px;
  border-radius: 8px 0 0 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1; /* Ensure it grows to fill the space */
`;

const Title = styled.h2`
  margin-bottom: 50px;
  color: #1F2937;
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
`;

const Logo = styled.img`
  display: block;     
  width: 100px;        
  height: auto;        
  margin: 0 auto 5px;
`;

const SocialButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const SocialButton = styled.button`
  background-color: ${(props) => props.bgColor};
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const Divider = styled.div`
  color: black;
  display: flex;
  align-items: center;
  margin: 20px 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #E5E7EB;
  }

  &::before {
    margin-right: 10px;
  }

  &::after {
    margin-left: 10px;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 12px;
  width: 100%; /* Ensure full width */
`;

const Icon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  left: 35px;
  padding-left: -20px;
  transform: translateY(-50%);
  color: black;
`;

const Input = styled.input`
  width: 85%;
  padding: 12px 12px 12px 40px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  color: #1F2937;
  background-color: #F3F4F6; /* Light grey background */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: left;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #6366F1;
  }
`;

const Button = styled.button`
  margin-top: 30px;
  padding: 12px 30px; /* Smaller width */
  margin-bottom: 12px;
  /* background-color: #4F46E5; Blue button */
  background: #2978D1;
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #6366F1;
  }
`;



const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/main');
    } catch (error) {
      console.error('Error logging in with email and password', error);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/main');
    } catch (error) {
      console.error('Error logging in with Google', error);
    }
  };

  const handleGitLogin = async () => {
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/main');
    } catch (error) {
      console.error('Error logging in with Github', error);
    }
  };

  return (    
    <Container>
      <PanelWrapper>
        <LoginCarosual />
        <FormWrapper>
          <Logo src={pulseLogo} alt="Pulse AI Logo" />
          <Title>Welcome to Pulse AI, Sign up or Login</Title>
          <SocialButtonsContainer>
            <SocialButton bgColor="#DB4437" onClick={handleGoogleLogin}>
              <FontAwesomeIcon icon={faGoogle} />
            </SocialButton>
            <SocialButton bgColor="#333" onClick={handleGitLogin}>
              <FontAwesomeIcon icon={faGithub} />
            </SocialButton>
          </SocialButtonsContainer>
          <Divider>OR</Divider>
          <form onSubmit={handleEmailLogin}>
            <InputWrapper>
              <Icon icon={faUser} />
              <Input
                type="text"
                placeholder="User Id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </InputWrapper>
            <InputWrapper>
              <Icon icon={faLock} />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </InputWrapper>
            <Button type="submit">Sign In</Button>
          </form>
        </FormWrapper>
      </PanelWrapper>
    </Container>
  );
};

export default LoginPage;
