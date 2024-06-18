// src/components/PulseAni.js
import React from 'react';
import { Link } from 'react-router-dom';
import './PulseAni.css';
import videoBackground from '../assets/vecteezy_purple-and-white-3d-technology-element-artificial_27989661.mp4';

const PulseAni = () => {
    return (
        <div className="pulse-container">
            <video autoPlay loop muted className="pulse-background">
                <source src={videoBackground} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="pulse-content">
                <Link to="/main" className="pulse-link">
                    <h1 className="pulse-title">PULSE AI</h1>
                </Link>
            </div>
        </div>
    );
};

export default PulseAni;
