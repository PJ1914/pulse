//import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import axios from 'axios';
import PulseAni from './components/PulseAni';
import Main from './components/Main';
import Messages from './components/messages/Messages';
import Weather from './components/Weather'; // Import the Weather component
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/pulseai" element={<PulseAni />} />
                <Route path="/main" element={<Main />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/weather" element={<Weather />} /> {/* Add Weather route */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
            </Routes>
        </Router>
    );
}

// function MainWithAxios() {
//     const [data, setData] = useState(null);

//     useEffect(() => {
//         axios.get('http://127.0.0.1:8000/api/main/')
//             .then(response => {
//                 setData(response.data);
//             })
//             .catch(error => {
//                 console.error('There was an error making the request!', error);
//             });
//     }, []);

//     return <Main data={data} />;
// }

// function MessagesWithAxios() {
//     const [data, setData] = useState(null);

//     useEffect(() => {
//         axios.get('http://127.0.0.1:8000/api/messages/')
//             .then(response => {
//                 setData(response.data);
//             })
//             .catch(error => {
//                 console.error('There was an error making the request!', error);
//             });
//     }, []);

//     return <Messages data={data} />;
// }

// function WeatherWithAxios() {
//     const [weatherData, setWeatherData] = useState(null);
//     const [location, setLocation] = useState(''); // State for user input

//     useEffect(() => {
//         if (location) { // Fetch data only if location is provided
//             axios.get(`http://127.0.0.1:8000/api/weather/${location}/`)
//                 .then(response => {
//                     setWeatherData(response.data);
//                 })
//                 .catch(error => {
//                     console.error('There was an error fetching the weather data!', error);
//                 });
//         }
//     }, [location]); // Dependency on location, fetches weather data when location changes

//     return <Weather weatherData={weatherData} setLocation={setLocation} />;
// }

export default App;
