import axios from "axios";
import { config } from "./config";
export const getWeather = async (query) => {
  const { data } = await axios.get(
    `${config.apiURL}?appid=${config.apiKey}&${query}`
  );
  return data;
}