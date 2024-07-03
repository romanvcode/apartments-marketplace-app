import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Apartment } from '../models/apartment.model';
import { AsyncPipe } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddFormApartmentComponent } from './add-form-apartment/add-form-apartment.component';
import { ApartmentComponent } from './apartment/apartment.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    RouterOutlet,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    AddFormApartmentComponent,
    ApartmentComponent,
  ],
})
export class AppComponent {
  http = inject(HttpClient);

  price: string = '';
  rooms: string = '';

  apartments$ = this.getApartments();
  apartments: Apartment[] = [];
  roomsFilter: number | undefined;

  onFormSubmit(form: FormGroup) {
    const addApartmentRequest = {
      name: form.value.name,
      rooms: form.value.rooms,
      description: form.value.description,
      price: form.value.price,
    };

    this.http
      .post('https://localhost:7085/apartments', addApartmentRequest)
      .subscribe({
        next: (value) => {
          console.log(value);
          this.apartments$ = this.getApartments();
          this.loadApartments();
          form.reset();
        },
      });
  }

  loadApartments() {
    this.apartments$ = this.getApartments();
    this.apartments$.subscribe((apartments) => {
      this.apartments = apartments;
    });
  }

  ngOnInit() {
    this.loadApartments();
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
    return this.http.get<Apartment[]>(
      `https://localhost:7085/apartments?price=${this.price}&rooms=${this.rooms}`
    );
  }

  onSortChange(event: Event) {
    const sortValue = (event.target as HTMLSelectElement).value;
    this.apartments$.subscribe(() => {
      if (sortValue === 'default') {
        this.price = '';
      }
      if (sortValue === 'price-asc') {
        this.price = 'asc';
      } else if (sortValue === 'price-desc') {
        this.price = 'desc';
      }
      this.loadApartments();
    });
  }

  onFilterChange(event: Event) {
    const filterValue = (event.target as HTMLSelectElement).value;
    this.apartments$.subscribe(() => {
      if (filterValue === 'default') {
        this.rooms = '';
      } else {
        this.rooms = filterValue;
      }
      this.loadApartments();
    });
  }
}
