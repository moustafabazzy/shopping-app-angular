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
  private _totalPrice = 0;
  private _subscriptions: Subscription[] = [];

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
    this._subscriptions.push(loadTotalPriceSubscription);
  }

  public get totalPrice(): number {
    return this._totalPrice;
  }

  public set totalPrice(price: number) {
    this._totalPrice = price;
  }
}
