import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomersService } from '../app-data/customers-service';
import { Customer } from '../models/customer.interface';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul *ngIf="customer$ | async as customer">
      <li>Customer Id: {{customer.id}}</li>
      <li>Customer Name: {{customer.name}}</li>
      <li>Customer Address: {{customer.address}}</li>
      <li>Customer City: {{customer.city}}</li>
      <li>Customer Country: {{customer.country}}</li>
    </ul>
  `,
})
export class SelectedCustomerPageComponent {
  customer$: Observable<Customer | undefined> = this.customersService.getSelectedCustomer();

  constructor(private readonly customersService: CustomersService) { }
}
