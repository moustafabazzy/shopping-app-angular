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
  private _selectedProducts: ProductInterface[] = [];
  private _totalPrice = 0;
  private _subscriptions: Subscription[] = [];

  constructor(private cartService: CartService) { }

  public ngOnInit(): void {
    this.loadSelectedProducts();
    this.loadTotalPrice();
  }

  public ngOnDestroy() {
    this._subscriptions.map(subscription => subscription.unsubscribe());
  }

  private loadSelectedProducts(): void {
    const loadSelectedProductsSubscription = this.cartService
      .getSelectedProducts()
      .subscribe(selectedProducts => {
        this.selectedProducts = selectedProducts;
      });
    this._subscriptions.push(loadSelectedProductsSubscription);
  }

  private loadTotalPrice(): void {
    const loadTotalPriceSubscription = this.cartService
      .getTotalPrice()
      .subscribe(totalPrice => {
        this.totalPrice = totalPrice;
      });
    this._subscriptions.push(loadTotalPriceSubscription);
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

  public get totalPrice(): number {
    return this._totalPrice;
  }

  public set totalPrice(price: number) {
    this._totalPrice = price;
  }

  public get selectedProducts(): ProductInterface[] {
    return this._selectedProducts;
  }

  public set selectedProducts(products: ProductInterface[]) {
    this._selectedProducts = products;
  }
}
