import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import './LoginCarosual.css'; // Import the CSS file
import Logo1 from '../../assets/Login/Logo11.png';
import Logo2 from '../../assets/Login/Logo22.png';
import Logo3 from '../../assets/Login/Logo33.png';

const Logos = [Logo1, Logo2, Logo3];

const LoginCarosual = () => {
  const [logoIndex, setLogoIndex] = useState(0);

  // Use media query to check if the device is small
  const isSmallDevice = useMediaQuery({ maxWidth: 599 });

  useEffect(() => {
    if (!isSmallDevice) {
      // Only set the interval if it's not a small device
      const intervalId = setInterval(() => {
        setLogoIndex((prevIndex) => (prevIndex + 1) % Logos.length);
      }, 2000);

      return () => clearInterval(intervalId); // Clear the interval on component unmount
    }
  }, [isSmallDevice]);

  // Set the background image based on screen size
  const backgroundImage = isSmallDevice ? Logos[0] : Logos[logoIndex];

  return (
    <div
      className="SignUpPanel"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Additional content can be added here if needed */}
    </div>
  );
};

export default LoginCarosual;
