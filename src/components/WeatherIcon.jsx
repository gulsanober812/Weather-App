import React from 'react';
import './WeatherIcon.css';

const WeatherIcon = ({ condition, small }) => {
  const getIcon = () => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return '☀️';
      case 'clouds':
        return '☁️';
      case 'rain':
        return '🌧️';
      case 'drizzle':
        return '🌦️';
      case 'thunderstorm':
        return '⛈️';
      case 'snow':
        return '❄️';
      case 'mist':
      case 'smoke':
      case 'haze':
      case 'dust':
      case 'fog':
      case 'sand':
      case 'ash':
      case 'squall':
      case 'tornado':
        return '🌫️';
      default:
        return '🌈';
    }
  };

  return (
    <div className={`weather-icon ${small ? 'small' : ''}`}>
      {getIcon()}
    </div>
  );
};

export default WeatherIcon;