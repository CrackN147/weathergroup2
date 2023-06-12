import moment from 'moment';
import { config } from '../system/config';
export const BigCard = (props) => {
  const {
    weather,
    main,
    wind,
    dt
  } = props;
  return (
    <div className="big-card">
      <div className="big-card__header">
        <div className="big-card__header__item">
          <h1 className="big-card__title">
            {weather[0].main}
          </h1>
          <p className="big-card__subtitle">
            {weather[0].description}
          </p>
        </div>
        <div className="big-card__icon">
          <img src={`${config.iconUrl}${weather[0].icon}.png`} alt="icon"/>
        </div>
        <div className="big-card__header__date">
          <p className="big-card__header__date__title">
            Date
          </p>
          <p className="big-card__header__date__value">
            {moment.unix(dt).format('dddd, MM')}
          </p>
        </div>
      </div>
      <div className="big-card__body">
        <div className="big-card__body__item">
          <p className="big-card__body__item__title">
            Temperature
          </p>
          <p className="big-card__body__item__value">
            {main.temp}°C
          </p>
          <p className="big-card__body__item__value">
            Max: {main.temp_max}°C
          </p>
          <p className="big-card__body__item__value">
            Min: {main.temp_min}°C
          </p>
          <p className="big-card__body__item__value">
            Feels like: {main.feels_like}°C
          </p>
        </div>
        <div className="big-card__body__item">
          <p className="big-card__body__item__title">
            Humidity
          </p>
          <p className="big-card__body__item__value">
            {main.humidity}%
          </p>
        </div>
        <div className="big-card__body__item">
          <p className="big-card__body__item__title">
            Pressure
          </p>
          <p className="big-card__body__item__value">
            {main.pressure}hPa
          </p>
        </div>
        <div className="big-card__body__item">
          <p className="big-card__body__item__title">
            Wind
          </p>
          <p className="big-card__body__item__value">
            {wind.speed}m/s
          </p>
          <p>
            {wind.deg}°
          </p>
        </div>
      </div>
    </div>
  )
}