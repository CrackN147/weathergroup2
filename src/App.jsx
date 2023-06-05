import {useState, useEffect} from 'react';
import queryString from 'query-string';
import { Header, Card } from "./components";
import { getWeather } from "./system/api";
function App() {
  const [weather, setWeather] = useState({});
  const [query, setQuery] = useState("London");
  useEffect(() => {
    const fetchWeather = async () => {
      let query = {
        q: "Tbilisi",
        units: "metric",
      };
      const data = await getWeather(
        queryString.stringify(query)
      );
      setWeather(data);
    }
    fetchWeather();
  }, []);
  return (
    <div className="App">
      <Header/>
      <div className='card-container'>
        {weather?.list?.length > 0 && 
          weather.list.map((item, index) => (
            <Card key={index} 
              {...item}
            />
          ))
        }
      </div>
    </div>
  );
}

export default App;
