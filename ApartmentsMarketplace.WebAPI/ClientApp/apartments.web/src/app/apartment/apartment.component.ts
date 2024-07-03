import { Component, input, output } from '@angular/core';
import { Apartment } from '../../models/apartment.model';

@Component({
  selector: 'app-apartment',
  standalone: true,
  imports: [],
  templateUrl: './apartment.component.html',
  styleUrl: './apartment.component.css',
})
export class ApartmentComponent {
  item = input<Apartment>();

  delete = output<string>();

  onDelete() {
    this.delete.emit(this.item()!.id);
  }
}
