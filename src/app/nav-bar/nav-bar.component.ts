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
  totalPrice = 0;
  subscriptions: Subscription[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.loadTotalPrice();
  }

  loadTotalPrice(): void {
    const loadTotalPriceSubscription = this.cartService
      .getTotalPrice()
      .subscribe(totalPrice => {
        this.totalPrice = totalPrice;
      });
    this.subscriptions.push(loadTotalPriceSubscription);
  }

}
