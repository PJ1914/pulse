import React from 'react';
import './AboutUs.css'
import newBackground from '../../assets/main page/background.png'; // Update the path to your new background image

const AboutUs = () => {
  return (
    <div className="about-section" style={{ backgroundImage: `url(${newBackground})` }}>
      <h1>About Us</h1>
      <p>Pulse AI was created by Pranay Jumbarthi, a passionate full-stack developer and lifelong learner. His vision was to create a platform where AI could seamlessly blend with everyday tasks to make life easier and more productive. Our Mission: At Pulse AI, we aim to bring AI technology to everyone. We believe that artificial intelligence should be accessible, easy to use, and tailored to your needs. Our goal is to integrate AI into your daily routine, enhancing productivity and creativity with every interaction.</p>
    </div>
  );
};

export default AboutUs;
