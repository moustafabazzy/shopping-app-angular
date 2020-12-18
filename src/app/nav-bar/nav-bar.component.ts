import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

// SERVICES
import { CartService } from '../cart.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  public totalPrice = 0;
  private subscriptions: Subscription[] = [];

  constructor(private cartService: CartService) { }

  public ngOnInit(): void {
    this.loadTotalPrice();
  }

  private loadTotalPrice(): void {
    const loadTotalPriceSubscription = this.cartService
      .getTotalPrice()
      .subscribe(totalPrice => {
        this.totalPrice = totalPrice;
      });
    this.subscriptions.push(loadTotalPriceSubscription);
  }
}
