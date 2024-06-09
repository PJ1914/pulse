// src/components/Main.js
import React from 'react';
import { useNavigate,Link } from 'react-router-dom';
const Main = () => {
    return (
        <div>
            <h1>Welcome to the Main Page</h1>
            <h2><Link to='/messages'>chat with Pulse</Link></h2>
        </div>
    );
};

export default Main;
