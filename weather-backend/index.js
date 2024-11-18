const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());


const API_KEY = 'ae260dbe2f61cf06028ac5e170d20397';
const PORT = 5001;

// Root route for testing
app.get('/', (req, res) => {
    res.send('Weather API is running!');
});

// Weather route
app.get('/api/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }

    try {
        console.log(`Fetching weather data for city: ${city}`);
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ae260dbe2f61cf06028ac5e170d20397&units=metric`
        );
        const data = response.data;
        res.json({
            city: data.name,
            temp: data.main.temp,
            condition: data.weather[0].description,
        });

        console.log('Weather data fetched successfully:', response.data);
        
    } catch (error) {
        res.status(500).json({ error: 'Error fetching weather data' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
