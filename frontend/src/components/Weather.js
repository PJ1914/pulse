// frontend/src/components/Weather.js
import React, { useState } from 'react';

const Weather = ({ weatherData, setLocation }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSearch = () => {
        setLocation(inputValue); // Update location to trigger weather fetch
    };

    return (
        <div>
            <h2>Weather Information</h2>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter location"
            />
            <button onClick={handleSearch}>Get Weather</button>
            {weatherData ? (
                <div>
                    <h3>Weather Data for {inputValue}:</h3>
                    <p>{weatherData.weather}</p>
                </div>
            ) : (
                <p>Enter a location to get weather data.</p>
            )}
        </div>
    );
};

export default Weather;
