import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError('⚠️ Please enter a city name.');
      setWeather(null);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5001/api/weather?city=${city}`);
      setWeather(response.data);
      setError('');
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError('❌ Could not fetch weather data. Please enter a valid city name.');
      setWeather(null);
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">🌤️ Weather App</h1>
      <div className="input-container">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="city-input"
        />
        <button onClick={fetchWeather} className="get-weather-button">
          Get Weather
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}
      {weather && (
        <div className="weather-card">
          <h2 className="weather-title">Weather in {weather.city}</h2>
          <p className="weather-info">🌡️ Temperature: <strong>{weather.temp}°C</strong></p>
          <p className="weather-info">🌥️ Condition: <strong>{weather.condition}</strong></p>
        </div>
      )}
    </div>
  );
};

export default App;
