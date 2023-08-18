import React, { useState, useEffect } from 'react';
import {
  getCurrentTemperature,
  getTenDayForecast,
  getHumidity,
  getPrecipitation,
  getCondition,
} from '../api/api';
import Modal from './Modal';
import { WeatherAuth } from '../auth/WeatherAuth';
import { db } from '../firebase-config';
import { addDoc, doc, collection, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';
import Background from '../assets/background.jpg'

interface City {
  name: string;
}

export interface WeatherData {
  temperature: number;
  forecast: any[];
  humidity: number;
  precipitation: string;
  condition: string;
}



function CityTable() {
  const [cities, setCities] = useState<City[]>([]);
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [conditions, setConditions] = useState<any>([]);
  const [newCityName, setNewCityName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalCityIndex, setModalCityIndex] = useState<number | null>(null);
  const [weatherLoaded, setWeatherLoaded] = useState(false);

  

  const { user } = WeatherAuth();
  const userId = user?.uid;


  useEffect(() => {
    if (userId) {
      const userDocRef = doc(db, 'users', userId);
      const citiesCollectionRef = collection(userDocRef, 'cities');
  
        
      getDocs(citiesCollectionRef)
      .then((querySnapshot) => {
        const fetchedCities: City[] = [];
        querySnapshot.forEach((doc) => {
          const cityName = doc.data().name;
          fetchedCities.push({ name: cityName });
        });
        setCities(fetchedCities);
      })
      .catch((error) => {
        console.error('Error fetching cities:', error);
      });
    }
  }, [userId]);

  const fetchWeatherDataForCity = async (city: City) => {
    const [temperature, forecast, humidity, precipitation, condition] = await Promise.all([
      getCurrentTemperature(city.name),
      getTenDayForecast(city.name),
      getHumidity(city.name),
      getPrecipitation(city.name),
      getCondition(city.name),
    ]);
    return { temperature, forecast, humidity, precipitation, condition };
  };
  
  const handleShowModal = (index: number) => {
    setShowModal(true);
    setModalCityIndex(index);
    const city = cities[index];
    Promise.all([
      getCurrentTemperature(city.name),
      getTenDayForecast(city.name),
      getHumidity(city.name),
      getPrecipitation(city.name),
      getCondition(city.name),
      ])
    .then(([temperature, forecast, humidity, precipitation, condition]) => {
      const cityWeatherData = { temperature, forecast, humidity, precipitation, condition };
      setWeatherData((prevWeatherData) => {
        const newWeatherData = [...prevWeatherData];
        newWeatherData[index] = cityWeatherData;
        return newWeatherData;
      });
      setConditions((prevConditions: string) => {
        const newConditions = [...prevConditions];
        newConditions[index] = condition;
        return newConditions;
      });
      setWeatherLoaded(true);
      });
  };
    

  const capitalizeCityName = (cityName: string) => {
    const words = cityName.split(' ');
    const capitalizedWords = words.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    return capitalizedWords.join(' ');
  };

  const handleAddCity = async () => {
    if (newCityName && userId) {
      const formattedCityName = capitalizeCityName(newCityName);
      const userDocRef = doc(db, 'users', userId);
      const citiesCollectionRef = collection(userDocRef, 'cities');
      await addDoc(citiesCollectionRef, { name: formattedCityName });
      setCities((prevCities) => [...prevCities, { name: formattedCityName }]);
      setNewCityName('');
    }
  };

  const handleDeleteCity = async (index: number) => {
    const cityToDelete = cities[index];
    if (userId && cityToDelete) {
      const userDocRef = doc(db, 'users', userId);
      const cityDocRef = doc(userDocRef, 'cities', cityToDelete.name);
      try {
        await deleteDoc(cityDocRef);
  
        setCities((prevCities) => prevCities.filter((_, i) => i !== index));
        setWeatherData((prevData) => prevData.filter((_, i) => i !== index));
  
        console.log(`City '${cityToDelete.name}' deleted successfully.`);
      } catch (error) {
        console.error(`Error deleting city '${cityToDelete.name}':`, error);
      }
    }
  };


  const handleUpdateCityName = async (index: number, newName: string) => {
    const cityToUpdate = cities[index];
    if (userId && cityToUpdate) {
      console.log('Updating city:', cityToUpdate.name);
      try {
        const userDocRef = doc(db, 'users', userId);
        console.log('User doc ref:', userDocRef.path);
        
        const encodedNewName = encodeURIComponent(newName);
        console.log('Encoded new name:', encodedNewName);
        
        const oldCityDocRef = doc(userDocRef, 'cities', cityToUpdate.name);
        console.log('Old city doc ref:', oldCityDocRef.path);
  
        const newCityDocRef = doc(userDocRef, 'cities', encodedNewName);
        console.log('New city doc ref:', newCityDocRef.path);

        await updateDoc(newCityDocRef, { name: newName });
        setCities((prevCities) =>
          prevCities.map((city, i) => (i === index ? { ...city, name: newName } : city))
        );

  
      } catch (error) {
        console.error('Error updating city name:', error);
      }
    }
  };
  
        
  return (
    <>
    <div style={{backgroundImage: Background }}>
      <div className="bg-black bg-opacity-70 mx-auto w-6/12 p-4 rounded-md flex justify-center justify-items-center justify-self-center">
          <input
            type="text"
            placeholder="Enter city name"
            value={newCityName}
            onChange={(e) => setNewCityName(e.target.value)}
            className="bg-white p-2 rounded-md"
          />
          <button
            onClick={handleAddCity}
            className="bg-black text-white p-2 rounded-md ml-2 hover:bg-white hover:text-black"
          >
            Add
          </button>
        </div>
        <div className="flex justify-center2">
        <table className="border w-6/12 mx-auto border-blue-500">
          <thead>
            <tr>
              <th className="border-b border-blue-500 p-2">City</th>
            </tr>
          </thead>
          <tbody>
            {cities.map((city, index) => (
              <tr key={city.name} className="border-b border-blue-500">
                <td className="border-r border-blue-500 p-2 text-center">
                  <div className='font-extrabold text-4xl'>{city.name}</div>
                  <div className="flex justify-center space-x-2 mt-2">
                    <button
                      onClick={() => handleDeleteCity(index)}
                      className="bg-black text-white px-3 py-1 rounded hover:bg-white hover:text-black"
                    >
                      Delete
                    </button>
                    <input
                      type="text"
                      placeholder="Enter new city name"
                      className="p-1 border border-blue-500"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === 'Return') {
                          handleUpdateCityName(index, city.name);
                          console.log(e.key)
                        }}
                      }
                    />
                    <button
                      onClick={() => handleShowModal(index)}
                      className="bg-black text-white px-3 py-1 rounded hover:bg-white hover:text-black"
                    >
                      Show Weather
                    </button>
                    { weatherLoaded && showModal && modalCityIndex !== null && weatherData[modalCityIndex] && conditions[modalCityIndex] && (
                        <Modal
                          open={true}
                          city={cities[modalCityIndex].name}
                          condition={conditions[modalCityIndex]}
                          weatherData={weatherData[modalCityIndex]}
                          onClose={() => setShowModal(false)}
                        />
                      )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
      
    </>
  );
}


export default CityTable;
