import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { City } from '../interfaces/city.interface';
import { WeatherResponse } from '../interfaces/weather-response.interface';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private readonly http = inject(HttpClient);

  searchCity(query: string): Observable<City[]> {
    return this.http.get<City[]>(
      `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=9a31e58d50d9ee496990806b8a130a88`
    );
  }

  getCityWeather(city: City): Observable<WeatherResponse> {
    return this.http.get<WeatherResponse>(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=9a31e58d50d9ee496990806b8a130a88&units=metric`
    );
  }
}
