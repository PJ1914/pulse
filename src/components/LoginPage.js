import {React,useState} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../config/config';
import { signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #F3F4F6;
`;

const FormWrapper = styled.div`
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #1F2937;
  font-family: 'Roboto', sans-serif;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 12px;
  border: 1px solid #E5E7EB;
  border-radius: 4px;
  font-size: 16px;
  color: #1F2937;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  margin-bottom: 12px;
  background-color: #1D4ED8;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #2563EB;
  }
`;

const SocialButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.bgColor || '#1D4ED8'};
  margin-bottom: 8px;

  &:hover {
    background-color: ${(props) => props.hoverColor || '#2563EB'};
  }
`;

const Icon = styled(FontAwesomeIcon)`
  margin-right: 8px;
`;

const StyledLink = styled(Link)`
  display: block; /* Ensure block-level display for centering */
  text-align: center;
  color: #2563EB;
  text-decoration: none;
  font-size: 14px;
  margin-top: 8px;

  &:hover {
    text-decoration: underline;
  }
`;

// The LoginPage component
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav =useNavigate()
 
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      nav('/main'); // Redirect to home page after login
    } catch (error) {
      console.error('Error logging in with email and password', error);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      nav('/main'); // Redirect to home page after login
      
    } catch (error) {
      console.error('Error logging in with Google', error);
    }
  };



  return (
    <Container>
      <FormWrapper>
        <Title>Login</Title>
        <form onSubmit={handleEmailLogin}>
          <Input type="text" placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          required />
          <Input type="password" placeholder="Password" 
          value={password}   
          onChange={(e) => setPassword(e.target.value)} 
          required />
          <Button type="submit">Login</Button>
        </form>
        <SocialButton bgColor="#DB4437" hoverColor="#C1351B" onClick={handleGoogleLogin}>
          <Icon icon={faGoogle}  /> Login with Google
        </SocialButton>
        <SocialButton bgColor="#4267B2" hoverColor="#3755A6">
          <Icon icon={faFacebook} /> Login with Facebook
        </SocialButton>
        <SocialButton bgColor="#333" hoverColor="#444">
          <Icon icon={faGithub} /> Login with GitHub
        </SocialButton>
        <StyledLink to='/signup'>Don't have an account? Sign up</StyledLink> 
      </FormWrapper>
    </Container>
  );
};

export default LoginPage;
