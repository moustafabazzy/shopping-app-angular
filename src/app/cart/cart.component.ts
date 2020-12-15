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
  totalPrice = 0;
  subscriptions: Subscription[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.loadSelectedProducts();
    this.loadTotalPrice();
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

  loadTotalPrice(): void {
    const loadTotalPriceSubscription = this.cartService
      .getTotalPrice()
      .subscribe(totalPrice => {
        this.totalPrice = totalPrice;
      });
    this.subscriptions.push(loadTotalPriceSubscription);
  }

  addItem(productId: number): void {
    this.cartService.addProduct(productId);
  }

  removeItem(productId: number): void {
    this.cartService.removeProduct(productId);
  }

  calculatePrice(product: any): number {
    if (product && product.unit && product.price) {
      return product.unit * product.price;
    }

    return 0;
  }
}
