import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Customer } from '../models/customer.interface';
import { Order } from '../models/order.interface';
import { Product } from '../models/product.interface';

@Injectable({ providedIn: 'root' })
export class AppDataApiService {
  products$: Observable<Product[]> = this.http.get<Product[]>('api/products').pipe(tap(() => console.log('api/products api call')));

  customers$: Observable<Customer[]> =
    this.http.get<Customer[]>('api/customers').pipe(tap(() => console.log('api/customers api call')));

  orders$: Observable<Order[]> = this.http.get<Order[]>('api/orders').pipe(tap(() => console.log('api/orders api call')));

  constructor(private http: HttpClient) {}
}
