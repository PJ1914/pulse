import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import PulseAni from './components/PulseAni';
import Main from './components/Main';
import Messages from './components/Messages';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PulseAni />} />
                <Route path="/Main" element={<MainWithAxios />} />
                <Route path="/Messages" element={<MessagesWithAxios />} />
            </Routes>
        </Router>
    );
}

function MainWithAxios() {
    const [data, setData] = useState(null);

    useEffect(() => {
        // Fetch data from Django API when the component mounts
        axios.get('http://127.0.0.1:8000/api/main/')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('There was an error making the request!', error);
            });
    }, []); // Empty dependency array ensures the effect runs only once after mounting

    return (
        <Main data={data} />
    );
}

function MessagesWithAxios() {
    const [data, setData] = useState(null);

    useEffect(() => {
        // Fetch data from Django API when the component mounts
        axios.get('http://127.0.0.1:8000/api/messages/')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('There was an error making the request!', error);
            });
    }, []); // Empty dependency array ensures the effect runs only once after mounting

    return (
        <Messages data={data} />
    );
}

export default App;
