import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from '../cart.service';
import { ProductInterface } from '../product.interface';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  public selectedProducts: ProductInterface[] = [];
  public totalPrice = 0;
  private subscriptions: Subscription[] = [];

  constructor(private cartService: CartService) { }

  public ngOnInit(): void {
    this.loadSelectedProducts();
    this.loadTotalPrice();
  }

  public ngOnDestroy() {
    this.subscriptions.map(subscription => subscription.unsubscribe());
  }

  private loadSelectedProducts(): void {
    const loadSelectedProductsSubscription = this.cartService
      .getSelectedProducts()
      .subscribe(selectedProducts => {
        this.selectedProducts = selectedProducts;
      });
    this.subscriptions.push(loadSelectedProductsSubscription);
  }

  private loadTotalPrice(): void {
    const loadTotalPriceSubscription = this.cartService
      .getTotalPrice()
      .subscribe(totalPrice => {
        this.totalPrice = totalPrice;
      });
    this.subscriptions.push(loadTotalPriceSubscription);
  }

  public addItem(productId: number): void {
    this.cartService.addProduct(productId);
  }

  public removeItemUnit(productId: number): void {
    this.cartService.removeProductUnit(productId);
  }

  public removeItem(productId: number): void {
    this.cartService.removeProduct(productId);
  }

  public calculatePrice(product: any): number {
    if (product && product.unit && product.price) {
      return product.unit * product.price;
    }

    return 0;
  }

  public isEmptyCart(): boolean {
    return this.selectedProducts.length === 0;
  }
}
