import axios from 'axios';
import cors from 'cors';
import express, { Request, Response } from 'express';
import { CitiesData, RawData, WeatherData } from './types';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 5000;

app.get('/search', function (req: Request, res: Response): void {
  const query = req.query.queryStr;
  console.log(query);
  const limit = 1;
  const apiKey = process.env.API_KEY;
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${limit}&appid=${apiKey}`;

  const url2 = (lat: string, lon: string): string =>
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`;

  const getWeather = async (lat: string, lon: string) => {
    await axios
      .get(url2(lat, lon))
      .then((response: RawData) => {
        res.send(JSON.stringify(formatData(response)));
      })
      .catch(function (error: Error) {
        console.log(error);
      });
  };

  const getCitiesPlacement = async () => {
    await axios
      .get(url)
      .then((response: CitiesData) =>
        getWeather(response.data[0].lat, response.data[0].lon),
      )
      .catch(function (error: Error) {
        console.log(error);
      });
  };

  const formatData = (rawData: RawData): WeatherData => {
    const final = {
      windSpeed: Math.round(rawData.data.daily[0].wind_speed),
      temp: Math.round(rawData.data.daily[0].temp.day),
      feelsLike: Math.round(rawData.data.daily[0].feels_like.day),
      pressure: Math.round(rawData.data.daily[0].pressure),
      summary: rawData.data.daily[0].summary,
      weather:
        rawData.data.daily[0].weather[0].description[0].toUpperCase() +
        rawData.data.daily[0].weather[0].description.slice(1),
    };

    return final;
  };

  getCitiesPlacement();
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
