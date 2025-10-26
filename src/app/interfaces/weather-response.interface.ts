import { Weather } from './weather.interface';

export interface WeatherResponse {
  cod: string;
  message: number;
  cnt: number;
  list: Weather[];
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}
