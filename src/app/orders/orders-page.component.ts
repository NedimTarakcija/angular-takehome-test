import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomersService } from '../app-data/customers-service';
import { OrdersService } from '../app-data/orders-service';
import { Customer } from '../models/customer.interface';
import { OrderTableItem } from '../models/order-table-item';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <select (change)="onCustomerSelect($event)">
      <option *ngFor="let filterOption of getCustomerFilterOptions() | async | keyvalue"
        [value]="filterOption.key" [selected]="filterOption.key === (selectedCustomerId$ | async) ? 'selected' : null">
        {{filterOption.value}}
      </option>
    </select>
    <table>
      <thead>
        <th>Order Id</th>
        <th>Customer Name</th>
        <th>Order Date</th>
        <th>Product Name</th>
      </thead>
      <tbody>
        <tr *ngFor="let order of (orders$ | async)">
          <td>{{order.id}}</td>
          <td>{{order.customerName}}</td>
          <td>{{order.date | date:'dd/MM/yyyy'}}</td>
          <td>{{order.productName}}</td>
        </tr>
      </tbody>
    </table>
  `,
})
export class OrdersPageComponent {
  selectedCustomerId$: Observable<number> = this.customersService.selectedCustomerId$;
  customers$: Observable<Customer[]> = this.customersService.getAllCustomers();
  orders$: Observable<OrderTableItem[]> = this.ordersService.getFilteredOrders(this.selectedCustomerId$);

  constructor(
    private readonly ordersService: OrdersService,
    private readonly customersService: CustomersService) { }

  getCustomerFilterOptions(): Observable<Map<number, string>> {
    return this.customersService.getCustomerFilterOptions();
  }

  onCustomerSelect(event: Event): void {
    const customerId = Number((event.target as HTMLInputElement).value);
    this.customersService.setSelectedCustomer(customerId);
  }
}
