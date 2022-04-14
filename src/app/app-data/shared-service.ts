import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, lastValueFrom, Observable } from 'rxjs';
import { Customer } from '../models/customer.interface';
import { Order } from '../models/order.interface';
import { Product } from '../models/product.interface';
import { AppDataApiService } from './app-data-api.service';

@Injectable({ providedIn: 'root' })
export class SharedService {
  private readonly ordersSubject$: BehaviorSubject<any> = new BehaviorSubject([]);
  private readonly productsSubject$: BehaviorSubject<any> = new BehaviorSubject([]);
  private readonly customerSubject$: BehaviorSubject<any> = new BehaviorSubject([]);

  get orders$(): Observable<Order[]> {
    return this.ordersSubject$;
  }

  get products$(): Observable<Product[]> {
    return this.productsSubject$;
  }

  get customers$(): Observable<Customer[]> {
    return this.customerSubject$;
  }

  constructor(private readonly appDataApiService: AppDataApiService) { }

  async loadData(): Promise<void> {
    lastValueFrom(combineLatest([
      this.appDataApiService.orders$,
      this.appDataApiService.products$,
      this.appDataApiService.customers$
    ])).then(([orders, products, customers]) => {
      this.ordersSubject$.next(orders);
      this.productsSubject$.next(products);
      this.customerSubject$.next(customers);
    });
  }
}
