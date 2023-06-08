import { PropTypes } from "prop-types";
import { config } from "../system/config";
export const Card = (props) => {
  // console.log(props);
  const { 
    weather, 
    temp,
    humidity,
    speed,
    onClick,
  } = props;
  return (
    <div className="card">
      <div className="card__header" 
        onClick={onClick}
      >
        <div className="card__header__item">
          <h1 className="card__title">
            {weather[0].main}
          </h1>
          <p className="card__subtitle">
            {weather[0].description}
          </p>
        </div>
        <div className="card__icon">
          <img src={`${config.iconUrl}${weather[0].icon}.png`} alt="icon"/>
        </div>
      </div>
      <div className="card__body">
        <div className="card__body__item">
          <p className="card__body__item__title">
            Temperature
          </p>
          <p className="card__body__item__value">
            Max: {temp.max}°C
          </p>
          <p className="card__body__item__value">
            Min: {temp.min}°C
          </p>
        </div>
        <div className="card__body__item">
          <p className="card__body__item__title">
            Humidity
          </p>
          <p className="card__body__item__value">
            {humidity}%
          </p>
        </div>
        <div className="card__body__item">
          <p className="card__body__item__title">
            Wind
          </p>
          <p className="card__body__item__value">
            {speed}m/s
          </p>
        </div>
      </div>
    </div>
  )
}
Card.propTypes = {
  temp: PropTypes.object,
  weather: PropTypes.array,
  humidity: PropTypes.number,
  speed: PropTypes.number,
}