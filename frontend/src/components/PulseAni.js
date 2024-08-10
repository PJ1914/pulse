// src/components/PulseAni.js
import React from 'react';
// import videoBackground from '../assets/Pulse AI.mp4'
import { Link } from 'react-router-dom';
import './PulseAni.css';
// import videoBackground from '';

const PulseAni = () => {
    return (
        <div className="pulse-container">
            {<video autoPlay loop muted className="pulse-background">
                <source src="" type="video/mp4" />
                Your browser does not support the video tag.
            </video>}
            <div className="pulse-content">
                <Link to="/main" className="pulse-link">
                    <h1 className="pulse-title">PULSE AI</h1>
                </Link>
            </div>
        </div>
    );
};

export default PulseAni;
