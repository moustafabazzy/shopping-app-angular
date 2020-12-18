import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ProductsList } from './productsList';
import { ProductInterface } from './product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private products: ProductInterface[] = ProductsList;
  private totalPrice = 0;
  private totalPrice$: BehaviorSubject<number> = new BehaviorSubject(0);
  private selectedProducts: ProductInterface[] = [];
  private selectedProducts$: BehaviorSubject<ProductInterface[]> = new BehaviorSubject([]);

  constructor() { }

  public getAllProducts(): ProductInterface[] {
    return [...this.products];
  }

  public getSelectedProducts(): Observable<ProductInterface[]> {
    return this.selectedProducts$.asObservable();
  }

  public getTotalPrice(): Observable<number> {
    return this.totalPrice$.asObservable();
  }

  public addProduct(productId: number): void {
    let addToCart = true;
    this.selectedProducts.forEach(p => {
      if (p.id === productId) {
        p.unit += 1;
        addToCart = false;
      }
    });
    if (addToCart) {
      const product = this.products.find(p => p.id === productId);
      this.selectedProducts.push({...product});
    }
    this.selectedProducts$.next(this.selectedProducts);
    this.updateTotalPrice();
  }

  public removeProductUnit(productId: number): void {
    let removeFromList = true;
    this.selectedProducts.forEach(p => {
      if (p.id === productId && p.unit > 1) {
        p.unit -= 1;
        removeFromList = false;
      }
    });
    if (removeFromList) {
      this.removeProduct(productId);
      return;
    }
    this.selectedProducts$.next(this.selectedProducts);
    this.updateTotalPrice();
  }

  public removeProduct(productId: number): void {
    this.selectedProducts = this.selectedProducts.filter(p => {
      if (p.id !== productId) {
        return p;
      }
    });
    this.selectedProducts$.next(this.selectedProducts);
    this.updateTotalPrice();
  }

  private updateTotalPrice(): void {
    this.totalPrice = 0;
    this.selectedProducts.forEach(product => {
      this.totalPrice += product.unit * product.price;
    });
    this.totalPrice$.next(this.totalPrice);
  }
}
