import React from 'react';
import WeatherIcon from './WeatherIcon';


const DailyForecast = ({ data, days, unit }) => {
  if (!data) return null;

 
  const dailyForecasts = {};
  data.list.forEach((item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!dailyForecasts[date]) {
      dailyForecasts[date] = [];
    }
    dailyForecasts[date].push(item);
  });

  
  const forecastDates = Object.keys(dailyForecasts).slice(1, days + 1);

  return (
    <div className="daily-forecast">
      <h3>{days}-Day Forecast</h3>
      <div className="forecast-cards">
        {forecastDates.map((date) => {
          const dayForecasts = dailyForecasts[date];
          const dayName = new Date(dayForecasts[0].dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
          
        
          const temps = dayForecasts.map((f) => f.main.temp);
          const minTemp = Math.round(Math.min(...temps));
          const maxTemp = Math.round(Math.max(...temps));
          
        
          const conditions = dayForecasts.map((f) => f.weather[0].main);
          const mostCommonCondition = mode(conditions);

          return (
            <div key={date} className="forecast-card">
              <div className="forecast-day">{dayName}</div>
              <div className="forecast-icon">
                <WeatherIcon condition={mostCommonCondition} small />
              </div>
              <div className="forecast-temps">
                <span className="max-temp">{maxTemp}°</span>
                <span className="min-temp">{minTemp}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


const mode = (array) => {
  const count = {};
  array.forEach((item) => {
    count[item] = (count[item] || 0) + 1;
  });
  return Object.keys(count).reduce((a, b) => (count[a] > count[b] ? a : b));
};

export default DailyForecast;
