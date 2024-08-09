import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../config/config';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import pulseLogo from '../assets/pulse_logo.png'; // Adjust the path as necessary

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #E0E7FF; /* Light purple background */
`;

const PanelWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 800px;
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
  margin-bottom: 20px;
  color: #1F2937;
  font-family: 'Roboto', sans-serif;
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
  left: 10px;
  transform: translateY(-50%);
  color: #9CA3AF;
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

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #6366F1;
  }
`;

const Button = styled.button`
  padding: 12px 24px; /* Smaller width */
  margin-bottom: 12px;
  background-color: #4F46E5; /* Blue button */
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #6366F1;
  }
`;

const StyledLink = styled(Link)`
  display: block; /* Ensure block-level display for centering */
  text-align: center;
  color: #4F46E5;
  text-decoration: none;
  font-size: 14px;
  margin-top: 8px;

  &:hover {
    text-decoration: underline;
  }
`;

const SignUpPanel = styled.div`
  background: linear-gradient(135deg, #1D4ED8, #6366F1); /* Gradient background */
  background-image: url(${pulseLogo});
  background-size: cover;
  background-position: center;
  color: white;
  padding: 40px;
  border-radius: 0 8px 8px 0;
  text-align: center;
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1; /* Ensure it grows to fill the space */
  position: relative;
`;

const Overlay = styled.div`
  border-radius: 8px;
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopText = styled.div`
  position: absolute;
  top: 20px;
  text-align: center;
  width: 100%;
`;

const BottomText = styled.div`
  position: absolute;
  bottom: 20px;
  text-align: center;
  width: 100%;
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
        <FormWrapper>
          <Title>Login to Your Account</Title>
          <SocialButtonsContainer>
            <SocialButton bgColor="#4267B2" onClick={handleGoogleLogin}>
              <FontAwesomeIcon icon={faFacebook} />
            </SocialButton>
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
              <Icon icon={faEnvelope} />
              <Input 
                type="text" 
                placeholder="Email" 
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
        <SignUpPanel>
          <TopText>
            <h3>New Here?</h3>
          </TopText>

          <BottomText>
            <p>Sign up and discover a great amount of new opportunities!</p>
          </BottomText>
        </SignUpPanel>
      </PanelWrapper>
    </Container>
  );
};

export default LoginPage;
