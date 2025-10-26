import { Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Weather } from '../../interfaces/weather.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-weather-item',
  imports: [MatCardModule, DatePipe],
  templateUrl: './weather-item.component.html',
  styleUrl: './weather-item.component.scss',
})
export class WeatherItemComponent {
  weather = input.required<Weather>();

  date = computed(() => new Date(this.weather().dt * 1000));
}
