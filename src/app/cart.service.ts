import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ProductsList } from './productsList';
import { ProductInterface } from './product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  products: ProductInterface[] = ProductsList;
  totalPrice = 0;
  totalPrice$: BehaviorSubject<number> = new BehaviorSubject(0);
  selectedProducts: ProductInterface[] = [];
  selectedProducts$: BehaviorSubject<ProductInterface[]> = new BehaviorSubject([]);

  constructor() { }

  getAllProducts(): ProductInterface[] {
    return [...this.products];
  }

  getSelectedProducts(): Observable<ProductInterface[]> {
    return this.selectedProducts$.asObservable();
  }

  getTotalPrice(): Observable<number> {
    return this.totalPrice$.asObservable();
  }

  addProduct(productId: number): void {
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

  removeProductUnit(productId: number): void {
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

  removeProduct(productId: number): void {
    this.selectedProducts = this.selectedProducts.filter(p => {
      if (p.id !== productId) {
        return p;
      }
    });
    this.selectedProducts$.next(this.selectedProducts);
    this.updateTotalPrice();
  }

  updateTotalPrice(): void {
    this.totalPrice = 0;
    this.selectedProducts.forEach(product => {
      this.totalPrice += product.unit * product.price;
    });
    this.totalPrice$.next(this.totalPrice);
  }
}
