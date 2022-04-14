import { Injectable } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { Customer } from '../models/customer.interface';
import { OrderTableItem } from '../models/order-table-item';
import { Order } from '../models/order.interface';
import { Product } from '../models/product.interface';
import { SharedService } from './shared-service';

@Injectable({ providedIn: 'root' })
export class OrdersService {
  constructor(private readonly sharedService: SharedService) { }

  getFilteredOrders(customerId$: Observable<number>): Observable<OrderTableItem[]> {
    return combineLatest([
      this.sharedService.orders$,
      this.sharedService.customers$,
      this.sharedService.products$,
      customerId$
    ]).pipe(
      map(([orders, customers, products, customerId]) => {
        const filteredOrders = this.filterOrdersByCustomerId(orders, customerId);
        return this.mapOrdersToOrderTableItems(filteredOrders, customers, products);
      })
    );
  }

  private filterOrdersByCustomerId(orders: Order[], customerId: number): Order[] {
    return customerId !== -1 ? orders.filter((order: Order) => order.customerId === customerId) : orders;
  }

  private mapOrdersToOrderTableItems(orders: Order[], customers: Customer[], products: Product[]): OrderTableItem[] {
    return orders.map((order: Order) => ({
      ...order,
      customerName: customers.find((customer: Customer) => customer.id === order.customerId)?.name || '',
      productName: products.find((product: Product) => product.id === order.productId)?.name || ''
    }));
  }
}
