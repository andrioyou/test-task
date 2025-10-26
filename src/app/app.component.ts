import { Component, inject, signal } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { SearchCityComponent } from './components/search-city/search-city.component';
import { City } from './interfaces/city.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, take, takeUntil, throwError } from 'rxjs';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { Weather } from './interfaces/weather.interface';
import { WeatherResponse } from './interfaces/weather-response.interface';
import { WeatherListComponent } from './components/weather-list/weather-list.component';

@Component({
  selector: 'app-root',
  imports: [SearchCityComponent, SpinnerComponent, WeatherListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly weatherService = inject(WeatherService);

  cities = signal<City[]>([]);

  citiesError = signal(false);

  citiesAreLoading = signal(false);

  selectedCity = signal<City | null>(null);

  weatherList = signal<Weather[]>([]);

  weatherError = signal(false);

  weatherIsLoading = signal(false);

  searchCity(query: string): void {
    this.cities.set([]);

    if (!query) return;

    this.citiesError.set(false);
    this.citiesAreLoading.set(true);

    this.weatherService
      .searchCity(query)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.citiesAreLoading.set(false);
          this.citiesError.set(false);
          this.cities.set([]);
          return throwError(() => error);
        }),
        take(1)
      )
      .subscribe((cities) => {
        this.citiesAreLoading.set(false);
        this.cities.set(cities);
      });
  }

  getCityWeather(city: City): void {
    this.selectedCity.set(city);

    this.weatherError.set(false);
    this.weatherIsLoading.set(true);

    this.weatherService
      .getCityWeather(city)
      .pipe(
        catchError((error) => {
          this.weatherError.set(true);
          this.weatherIsLoading.set(false);
          return throwError(() => error);
        }),
        take(1)
      )
      .subscribe((weatherResponse: WeatherResponse) => {
        this.weatherIsLoading.set(false);
        this.weatherList.set(weatherResponse.list);
      });
  }
}
