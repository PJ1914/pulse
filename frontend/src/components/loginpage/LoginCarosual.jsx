import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Logo1 from '../../assets/Login/Logo1.png'
import Logo2 from '../../assets/Login/Logo2.png'
import Logo3 from '../../assets/Login/Logo3.png'

const Logos = [Logo1, Logo2, Logo3];

const SignUpPanel = styled.div`
  background: linear-gradient(135deg, #1D4ED8, #6366F1); 
  background-image: ${({ logo }) => `url(${logo})`}; 
  background-size: contain;
  background-position: center;
  color: white;
  padding: 40px;
  border-radius: 0 8px 8px 0;
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1; 
  position: relative;
`;

const LoginCarosual = () => {
  const [logoIndex, setLogoIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLogoIndex((prevIndex) => (prevIndex + 1) % Logos.length);
    }, 2000);

    return () => clearInterval(intervalId); // Clear the interval on component unmount
  }, []);

  return <SignUpPanel logo={Logos[logoIndex]}></SignUpPanel>;
};

export default LoginCarosual;
