import { useState, useEffect } from 'react';

import CurrentWeather from './components/CurrentWeather';
import DailyForecast from './components/DailyForecast';

import './App.css';


function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unit, setUnit] = useState('metric');
  const [forecastDays, setForecastDays] = useState(3);

  const API_KEY = '316607a81fe2015839c0a7cf59bad370'; 
  const BASE_URL = 'https://api.openweathermap.org/data/2.5';

  useEffect(() => {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
      setCity(lastCity);
      fetchWeatherData(lastCity);
    }
  }, []);

  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    setError('');
    try {
      
      const weatherResponse = await fetch(
        `${BASE_URL}/weather?q=${cityName}&units=${unit}&appid=${API_KEY}`
      );
      const weatherData = await weatherResponse.json();

      if (weatherData.cod !== 200) {
        throw new Error(weatherData.message || 'City not found');
      }

    
      const forecastResponse = await fetch(
        `${BASE_URL}/forecast?q=${cityName}&units=${unit}&appid=${API_KEY}`
      );
      const forecastData = await forecastResponse.json();

      setWeatherData(weatherData);
      setForecastData(forecastData);
      localStorage.setItem('lastCity', cityName);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeatherData(city);
    }
  };

 


  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
    if (city) {
      fetchWeatherData(city);
    }
  };


  return (
    <div>
     
      
   
       
      
      <main className="main-content">
       
        <form onSubmit={handleSearch} className="search-form">
           <h1 className='logo'>SkyPeek</h1>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="search-input"
          />
          <button type="submit">Search</button>
          <button type="button" onClick={toggleUnit}>
            °{unit === 'metric' ? 'C' : 'F'}
          </button>
        </form>

        {loading && <div className="loader">Loading...</div>}
        
        {error && <div className="error-message">{error}</div>}
        
        {weatherData && (
          <>
            <CurrentWeather 
              data={weatherData} 
              unit={unit} 
            />
            <DailyForecast 
              data={forecastData} 
              days={forecastDays} 
              unit={unit}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;