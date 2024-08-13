import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import './LoginPage.css';

const Logos = [Logo1, Logo2, Logo3];
let index = 0;
let logo = Logos[index];

setInterval(() => {
  index = (index + 1) % Logos.length;
  logo = Logos[index];
  console.log(index, logo);
}, 3000);

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
    <div className="Container">
      <div className="PanelWrapper">
        <LoginCarosual />
        <div className="FormWrapper">
          <img src={pulseLogo} alt="Pulse AI Logo" className="Logo" />
          <h2 className="Title">Welcome to Pulse AI, Sign up or Login</h2>
          <div className="SocialButtonsContainer">
            <button className="SocialButton" style={{ backgroundColor: '#DB4437' }} onClick={handleGoogleLogin}>
              <FontAwesomeIcon icon={faGoogle} />
            </button>
            <button className="SocialButton" style={{ backgroundColor: '#333' }} onClick={handleGitLogin}>
              <FontAwesomeIcon icon={faGithub} />
            </button>
          </div>
          <div className="Divider">OR</div>
          <form onSubmit={handleEmailLogin}>
            <div className="InputWrapper">
              <FontAwesomeIcon icon={faUser} className="Icon" />
              <input
                type="text"
                placeholder="User Id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="Input"
              />
            </div>
            <div className="InputWrapper">
              <FontAwesomeIcon icon={faLock} className="Icon" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="Input"
              />
            </div>
            <button type="submit" className="Button">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
