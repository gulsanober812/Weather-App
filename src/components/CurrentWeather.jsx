import React from 'react';
import WeatherIcon from './WeatherIcon';


const CurrentWeather = ({ data, unit }) => {
  if (!data) return null;

  const temperature = Math.round(data.main.temp);
  const feelsLike = Math.round(data.main.feels_like);
  const weatherCondition = data.weather[0].main;
  const cityName = data.name;
  const country = data.sys.country;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;
  const windDirection = data.wind.deg;
  const pressure = data.main.pressure;

  return (
    <div className="current-weather">
      <div className="weather-main">
        <div className="weather-icon">
          <WeatherIcon condition={weatherCondition} />
        </div>
        <div className="weather-temp">
          {temperature}°{unit === 'metric' ? 'C' : 'F'}
        </div>
        <div className="weather-condition">{weatherCondition}</div>
        <div className="weather-location">
          {cityName}, {country}
        </div>
      </div>
      <div className="weather-details">
        <div className="detail-item">
          <span>Feels Like:</span>
          <span>{feelsLike}°{unit === 'metric' ? 'C' : 'F'}</span>
        </div>
        <div className="detail-item">
          <span>Humidity:</span>
          <span>{humidity}%</span>
        </div>
        <div className="detail-item">
          <span>Wind:</span>
          <span>
            {windSpeed} {unit === 'metric' ? 'm/s' : 'mph'} {getWindDirection(windDirection)}
          </span>
        </div>
        <div className="detail-item">
          <span>Pressure:</span>
          <span>{pressure} hPa</span>
        </div>
      </div>
    </div>
  );
};

const getWindDirection = (degrees) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round((degrees % 360) / 45) % 8;
  return directions[index];
};

export default CurrentWeather;