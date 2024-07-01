import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Apartment } from '../models/apartment.model';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, AsyncPipe, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  http = inject(HttpClient);

  apartmentsForm = new FormGroup({
    name: new FormControl<string>(''),
    rooms: new FormControl<number>(0),
    description: new FormControl<string>(''),
    price: new FormControl<number>(0),
  });

  apartments$ = this.getContacts();

  onFormSubmit() {
    const addApartmentRequest = {
      name: this.apartmentsForm.value.name,
      rooms: this.apartmentsForm.value.rooms,
      description: this.apartmentsForm.value.description,
      price: this.apartmentsForm.value.price
    }

    this.http.post("https://localhost:7085/apartments", addApartmentRequest).subscribe({
      next: (value) => {
        console.log(value);
        this.apartments$ = this.getContacts();
        this.apartmentsForm.reset();
      }
    });
  }

  onDelete(id: string) {
    this.http.delete(`https://localhost:7085/apartments/${id}`).subscribe({
      next: () => {
        alert("Apartment deleted successfully");
        this.apartments$ = this.getContacts();
      }
    });
  }

  private getContacts(): Observable<Apartment[]> {
      return this.http.get<Apartment[]>("https://localhost:7085/apartments");
  }
}
