import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SharedService } from './app-data/shared-service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav>
      <a routerLink="orders">Orders</a> |
      <a routerLink="customer">Customer</a>
    </nav>

    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  constructor(private readonly sharedService: SharedService) {
    this.sharedService.loadData();
  }
}
