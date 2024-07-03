import { HttpClient } from '@angular/common/http';
import { Component, inject, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-form-apartment',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-form-apartment.component.html',
  styleUrl: './add-form-apartment.component.css',
})
export class AddFormApartmentComponent {
  http = inject(HttpClient);

  formSubmit = output<FormGroup>();

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

  onFormSubmit() {
    this.formSubmit.emit(this.apartmentsForm);
  }
}
