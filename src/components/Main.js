// src/components/Main.js
import React from 'react';
import styled from 'styled-components';
import { useNavigate,Link } from 'react-router-dom';
const Main = () => {
    return (
        <div>
            <h1><Link to='/login'>Welcome to the Main Page</Link></h1>
            <h2><Link to='/messages'>chat with Pulse</Link></h2>
        </div>

        
    );
};

export default Main;
