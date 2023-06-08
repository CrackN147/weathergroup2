import {useState, useEffect} from 'react';
import queryString from 'query-string';
import { 
  Header, 
  Card, 
  BigCard 
} from "./components";
import { getWeather, getCurrentWeather } from "./system/api";
function App() {
  const [weather, setWeather] = useState({});
  const [currentWeather, setCurrentWeather] = useState(null);
  const [active, setActive] = useState({});
  const [city, setCity] = useState("Tbilisi");

  const setActiveWeather = (item) => {console.log(item);
    setActive(item);
  }
  const changeCity = (newCity) => {
    setCity(newCity);
  }
  useEffect(() => {
    const fetchWeather = async () => {
      let query = {
        q: city,
        units: "metric",
      };
      const today = await getCurrentWeather(
        queryString.stringify(query)
      );
      setCurrentWeather(today);
      setActive(today);
      const forecast = await getWeather(
        queryString.stringify(query)
      );
      setWeather(forecast);
    }
    fetchWeather();
  }, [city]);
  return (
    <div className={`App ${
      active.weather ? 
        active.weather[0].main.toLowerCase() 
      : ''
    }`}>
      <Header
        changeCity={changeCity}
      />
      <div className='card-container'>
        {currentWeather !== null ?
          <BigCard
            {...currentWeather}
          />
          : null
        }
        {weather?.list?.length > 0 && 
          weather.list.map((item, index) => (
            <Card key={index} 
              {...item}
              onClick={() => setActiveWeather(item)}
            />
          ))
        }
      </div>
    </div>
  );
}

export default App;
