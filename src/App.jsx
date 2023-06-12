import {useState, useEffect, useRef} from 'react';
import queryString from 'query-string';
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { 
  Header, 
  Card, 
  BigCard 
} from "./components";
import { getWeather, getCurrentWeather } from "./system/api";
import "swiper/css";
import "swiper/css/pagination";

function App() {
  const slider = useRef(null);
  const [weather, setWeather] = useState({});
  const [currentWeather, setCurrentWeather] = useState(null);
  const [active, setActive] = useState(null);
  const [city, setCity] = useState("Tbilisi");

  // const progressCircle = useRef(null);
  // const progressContent = useRef(null);
  // const onAutoplayTimeLeft = (s, time, progress) => {
  //   progressCircle.current.style.setProperty('--progress', 1 - progress);
  //   progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  // };

  const onSlideChange = (event) => {
    let index = event.realIndex;
    let newWeather = weather.list[index];
    setActiveWeather(newWeather);
  }

  const setActiveWeather = (item) => {
    let copy = {...active};
    copy.dt = item.dt;
    copy.main.feels_like = item.feels_like.day;
    copy.main.humidity = item.humidity;
    copy.main.pressure = item.pressure;
    copy.main.temp = item.temp.day;
    copy.main.temp_max = item.temp.max;
    copy.main.temp_min = item.temp.min;
    copy.weather = item.weather;
    copy.wind.speed = item.speed;
    copy.wind.deg = item.deg;
    setActive(copy);
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
  useEffect(() => {
    if (slider.current !== null) {
      setTimeout(() => {
        let bullets = document.getElementsByClassName('swiper-pagination-bullet');
        bullets[1].click();
      }, 2500);
    }
  }, [slider]);
  return (
    <div className={`App ${
      active?.weather ? 
        active.weather[0].main.toLowerCase() 
      : ''
    }`}>
      <Header
        changeCity={changeCity}
      />
      <div className='card-container'>
        {active !== null ?
          <BigCard
            {...active}
          />
          : null
        }
        <Swiper
          ref={slider}
          slidesPerView={3}
          spaceBetween={0}
          loop={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Pagination]}
          // onAutoplayTimeLeft={onAutoplayTimeLeft}
          onSlideChange={onSlideChange}
          className="customSwiper"
        >
        {weather?.list?.length > 0 && 
          weather.list.map((item, index) => (
            <SwiperSlide key={index} >
              <Card
                {...item}
                onClick={() => setActiveWeather(item)}
              />
            </SwiperSlide>
          ))
        }
        {/* <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div> */}
        </Swiper>
      </div>
    </div>
  );
}

export default App;
