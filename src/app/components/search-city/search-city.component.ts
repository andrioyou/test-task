import { Component, input, OnDestroy, OnInit, output, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged, filter, map, Subject, takeUntil, tap } from 'rxjs';
import { City } from '../../interfaces/city.interface';

@Component({
  selector: 'app-search-city',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
  ],
  templateUrl: './search-city.component.html',
  styleUrl: './search-city.component.scss',
})
export class SearchCityComponent implements OnInit, OnDestroy {
  cities = input<City[]>([]);

  searchCity = output<string>();

  citySelected = output<City>();

  cityInput = new FormControl<string>('');

  selectedCity = signal<City | null>(null);

  private readonly destroy$ = new Subject<void>();

  ngOnInit() {
    this.initCityInput();
  }

  initCityInput(): void {
    this.cityInput.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map((query: string | null) => query || ''),
        filter((query) => query !== this.selectedCity()?.name),
        takeUntil(this.destroy$)
      )
      .subscribe((query) => {
        this.searchCity.emit(query);
      });
  }

  selectOption(city: City): void {
    this.selectedCity.set(city);
    this.citySelected.emit(city);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
