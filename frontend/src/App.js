// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PulseAni from './components/PulseAni';
import Main from './components/Main';
import Messages from './components/messages/Messages';
import Weather from './components/Weather';
import LoginPage from './components/loginpage/LoginPage';
import VoiceAsist from './components/AI voice/VoiceAsist'; 
import ItemList from './services/ItemList';
import ProtectedRoute from './ProtectedRoute';
import UserProfilePage from './components/User-data/UserProfilePage';
// to set sessions of users in page


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PulseAni />} />
                <Route path="/main" element={<Main />} />
                <Route path="/messages" element={<ProtectedRoute>
                        <Messages/>
                    </ProtectedRoute>} />
                <Route path="/weather" element={<Weather />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/voice" element={<ProtectedRoute>
                        <VoiceAsist />
                    </ProtectedRoute>} />
                <Route path="/iteam" element={<ItemList />} />
                <Route path="/profile" element={<UserProfilePage/>} />
            </Routes>
        </Router>
    );
}

export default App;
