import React, { useState, useEffect } from 'react';
import { 
  getCurrentTemperature, 
  getTenDayForecast,
  getHumidity,
  getPrecipitation, } from '../api/api';

interface City {
  name: string;
}

interface WeatherData {
  temperature: number;
  forecast: any[];
  humidity: number;
  precipitation: string;
}

function CityTable() {
  const [cities, setCities] = useState<City[]>([]);
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [newCityName, setNewCityName] = useState('');

  // Fetch the weather data for each city
  useEffect(() => {
    Promise.all(
      cities.map(async (city) => {
        const [temperature, forecast, humidity, precipitation] = await Promise.all([
          getCurrentTemperature(city.name),
          getTenDayForecast(city.name),
          getHumidity(city.name),
          getPrecipitation(city.name),
        ]);
        return { temperature, forecast, humidity, precipitation };
      })
    ).then((data) => setWeatherData(data));
  }, [cities]);

  const handleAddCity = () => {
    if (newCityName) {
      setCities((prevCities) => [...prevCities, { name: newCityName }]);
      setNewCityName('');
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Enter city name"
        value={newCityName}
        onChange={(e) => setNewCityName(e.target.value)}
      />
      <button onClick={handleAddCity}>Add</button>
      <table>
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature</th>
            <th>Humidity</th>
            <th>Precipitation</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((city, index) => (
            <tr key={city.name}>
              <td>{city.name}</td>
              <td>{weatherData[index]?.temperature}</td>
              <td>{weatherData[index]?.humidity}</td>
              <td>{weatherData[index]?.precipitation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default CityTable;
