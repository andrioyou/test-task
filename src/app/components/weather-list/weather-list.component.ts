import { Component, input } from '@angular/core';
import { Weather } from '../../interfaces/weather.interface';
import { WeatherItemComponent } from '../weather-item/weather-item.component';

@Component({
  selector: 'app-weather-list',
  imports: [WeatherItemComponent],
  templateUrl: './weather-list.component.html',
  styleUrl: './weather-list.component.scss',
})
export class WeatherListComponent {
  weatherList = input<Weather[]>([]);
}
