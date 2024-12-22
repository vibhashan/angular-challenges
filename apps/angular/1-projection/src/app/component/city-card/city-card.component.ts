import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities()"
      backgroundColor="background-color: rgba(0, 0, 250, 0.1);"
      (deleteItemId)="delete($event)">
      <img cardImage src="assets/img/city.png" width="200px" />
      <button
        addButton
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </app-card>
  `,
  imports: [CardComponent],
})
export class CityCardComponent implements OnInit {
  cities: WritableSignal<City[]> = signal([]);
  constructor(
    private readonly http: FakeHttpService,
    private readonly store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));

    this.store.cities$.subscribe((c) => this.cities.set(c));
  }

  addNewItem() {
    this.store.addOne(randomCity());
  }

  delete(id: number) {
    this.store.deleteOne(id);
  }
}
