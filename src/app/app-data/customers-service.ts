import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Customer } from '../models/customer.interface';
import { SharedService } from './shared-service';

@Injectable({ providedIn: 'root' })
export class CustomersService {
  private readonly customerId$: BehaviorSubject<number> = new BehaviorSubject<number>(-1);

  constructor(private readonly sharedService: SharedService) { }

  get selectedCustomerId$(): Observable<number> {
    return this.customerId$;
  }

  getAllCustomers(): Observable<Customer[]> {
    return this.sharedService.customers$;
  }

  getCustomerFilterOptions(): Observable<Map<number, string>> {
    return this.getAllCustomers().pipe(
      map((customers: Customer[]) => new Map(customers.map((customer: Customer) => [customer.id, customer.name]))),
      map((filers: Map<number, string>) => filers.set(-1, ''))
    );
  }

  setSelectedCustomer(id: number): void {
    this.customerId$.next(id);
  }

  getSelectedCustomer(): Observable<Customer | undefined> {
    return combineLatest([
      this.getAllCustomers(),
      this.selectedCustomerId$
    ]).pipe(map(([customers, selectedId]) => customers.find((customer: Customer) => customer.id === selectedId)));
  }
}
