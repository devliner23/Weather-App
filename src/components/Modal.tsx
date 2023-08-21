import { WeatherData } from "./CityTable";
import condition from "./CityTable"
import sunnyBackground from '../assets/bg-sunny.jpg'
import rainyBackground from '../assets/bg-rainy.jpg'
import cloudyBackground from '../assets/bg-cloudy.jpg'



type Props = {
  city?: string;
  weatherData: WeatherData;
  condition: string;
  open?: boolean;
  onClose: () => void;
};

interface ConditionsBackgrounds {
  [key: string]: string,
}

const Modal = (props: Props) => {
  if (!props.open) return <></>;

  const { city, weatherData, onClose, condition } = props;

  const formattedCity = city
    ? city
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "";

    const dailyForecast = weatherData.forecast.filter((forecastItem, index) => index % 8 === 0);

    const forecastRows = dailyForecast.map((forecastItem, index) => (
      <tr key={index}>
        <td>{new Date(forecastItem.dt_txt).toLocaleDateString()}</td>
        <td>{forecastItem.main.temp}°F</td>
      </tr>
    ));

    const conditionBackgrounds: ConditionsBackgrounds = {
      sunny: sunnyBackground,
      rain: rainyBackground,
      clouds: cloudyBackground,
    };

    const weatherCondition = condition ? condition.toLowerCase() : '';

    const BackGroundImage = conditionBackgrounds.hasOwnProperty(weatherCondition)
  ? conditionBackgrounds[weatherCondition]
  : sunnyBackground;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center z-50 bg-gray-300 bg-opacity-25"      
    >
      <div
        className="w-2/5 p-4 bg-white shadow-xl rounded"
        style= {{ backgroundImage: `url(${BackGroundImage})`, 
                  backgroundSize: 'cover',
                  width: '70%', // Adjust the width as needed
                  maxWidth: '800px',
                  height: '70%', // Adjust the height as needed
                  maxHeight: '600px',
                  
        }}

        onClick={(e) => {
          e.stopPropagation();
        
        }}
      >
        <div className="max-w-1000px max-h-600px">
          <div className="flex justify-end">
            <p
              className="p-2 rounded hover:bg-slate-800 text-white cursor-pointer"
              onClick={onClose}
            >
              X
            </p>
          </div>
          <div className="text-center p-2 mx-auto w-3/5">
            <h2 className="bg-black opacity-50 text-white p-2 text-xl border border-white rounded">{formattedCity}</h2><br />
            <p className="bg-black opacity-50 text-white p-2 text-lg border border-white rounded">Temperature: {weatherData.temperature}°F</p>
            <table className="table-auto w-full mt-4 p-2">
              <thead className="bg-black opacity-50 text-white">
                <tr>
                  <th>Date</th>
                  <th>Temperature</th>
                </tr>
              </thead>
              <tbody className="bg-black opacity-50 text-white">{forecastRows}</tbody>
            </table><br />
            <p className="bg-black opacity-50 text-white p-2 text-lg border border-white rounded">Humidity: {weatherData.humidity}%</p><br />
            <p className="bg-black opacity-50 text-white p-2 text-lg border border-white rounded">Precipitation: {weatherData.precipitation}</p><br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
