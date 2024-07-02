import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Apartment } from '../models/apartment.model';
import { AsyncPipe } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  http = inject(HttpClient);

  apartments$ = this.getApartments();
  sortedApartments: Apartment[] = [];
  roomsFilter: number | undefined;

  apartmentsForm = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.maxLength(99),
    ]),
    rooms: new FormControl<number>(0, [
      Validators.required,
      Validators.min(1),
      Validators.pattern('^[0-9]*$'),
    ]),
    description: new FormControl<string>('', Validators.maxLength(999)),
    price: new FormControl<number>(0, [Validators.required, Validators.min(1)]),
  });

  loadApartments() {
    this.apartments$.subscribe((apartments) => {
      this.sortedApartments = apartments;
    });
  }

  ngOnInit() {
    this.loadApartments();
  }

  onFormSubmit() {
    const addApartmentRequest = {
      name: this.apartmentsForm.value.name,
      rooms: this.apartmentsForm.value.rooms,
      description: this.apartmentsForm.value.description,
      price: this.apartmentsForm.value.price,
    };

    this.http
      .post('https://localhost:7085/apartments', addApartmentRequest)
      .subscribe({
        next: (value) => {
          console.log(value);
          this.apartments$ = this.getApartments();
          this.loadApartments();
          this.apartmentsForm.reset();
        },
      });
  }

  onDelete(id: string) {
    this.http.delete(`https://localhost:7085/apartments/${id}`).subscribe({
      next: () => {
        alert('Apartment deleted successfully');
        this.apartments$ = this.getApartments();
        this.loadApartments();
      },
    });
  }

  private getApartments(): Observable<Apartment[]> {
    return this.http.get<Apartment[]>('https://localhost:7085/apartments');
  }

  onSortChange(event: Event) {
    const sortValue = (event.target as HTMLSelectElement).value;
    this.apartments$.subscribe((apartments) => {
      if (sortValue === 'default') {
        this.sortedApartments = apartments;
      }
      if (sortValue === 'price-asc') {
        this.sortedApartments = apartments.sort((a, b) => a.price - b.price);
      } else if (sortValue === 'price-desc') {
        this.sortedApartments = apartments.sort((a, b) => b.price - a.price);
      }
    });
  }

  onFilterChange(event: Event) {
    const filterValue = (event.target as HTMLSelectElement).value;
    this.apartments$.subscribe((apartments) => {
      if (filterValue === 'default') {
        this.sortedApartments = apartments;
      } else {
        this.sortedApartments = apartments.filter(
          (a) => a.rooms.toString() == filterValue
        );
      }
    });
  }
}
