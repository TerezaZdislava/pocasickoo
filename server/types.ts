export type WeatherData = {
  windSpeed: number;
  temp: number;
  feelsLike: number;
  pressure: number;
  summary: string;
  weather: string;
};

export type RawData = {
  data: {
    daily: DailyData[];
  };
};

export type DailyData = {
  wind_speed: number;
  pressure: number;
  summary: string;
  temp: {
    day: number;
  };
  feels_like: {
    day: number;
  };
  weather: Weather[];
  [key: string]: any;
};

export type CitiesData = {
  data: City[];
};

export type Weather = {
  description: string;
};

export type City = {
  lat: string;
  lon: string;
  [key: string]: any;
};
