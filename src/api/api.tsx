const API_KEY = "96746681e87ce0dd717276bda852dddc";

export async function getCurrentTemperature(city: string) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`);
  const data = await response.json();
  return data.main.temp;
}

export async function getTenDayForecast(city: string) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=imperial`);
  const data = await response.json();
  return data.list;
}

export async function getHumidity(city: string) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
  const data = await response.json();
  return data.main.humidity;
}

export async function getPrecipitation(city: string) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
  const data = await response.json();
  return data.weather[0].description;
}

export async function getCondition(city: string) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
  const data = await response.json(); 
  if (data.weather && data.weather.length > 0) {
    return data.weather[0].main;
  } else {
    return 'Unknown'; 
  }

}
