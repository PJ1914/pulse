// src/components/PulseAni.js
import React from 'react';
import { Link } from 'react-router-dom';
import './PulseAni.css';

const PulseAni = () => {
    return (
        <div className="pulse-container">
            <Link to="/main" className="pulse-link">
                <h1 className="pulse-title">PULSE THE AI</h1>
            </Link>
        </div>
    );
};

export default PulseAni;
