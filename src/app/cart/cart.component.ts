import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  selectedProducts$: Observable<any>;
  selectedProducts = [];
  subscriptions: Subscription[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.loadSelectedProducts();
  }

  ngOnDestroy() {
    this.subscriptions.map(subscription => subscription.unsubscribe());
  }

  loadSelectedProducts(): void {
    const loadSelectedProductsSubscription = this.cartService
      .getSelectedProducts()
      .subscribe(selectedProducts => {
        this.selectedProducts = selectedProducts
      });
    this.subscriptions.push(loadSelectedProductsSubscription);
  }

}
