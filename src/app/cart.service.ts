import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductsList } from './productsList';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  products = ProductsList;
  totalPrice = 0;
  totalPrice$: BehaviorSubject<number> = new BehaviorSubject(0);
  selectedProducts = [];
  selectedProducts$: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor() { }

  getSelectedProducts() {
    return this.selectedProducts$.asObservable();
  }

  getTotalPrice() {
    return this.totalPrice$.asObservable();
  }

  addProduct(productId: number): void {
    let productSelected = false;
    this.selectedProducts.forEach(p => {
      if (p.id === productId) {
        p.unit += 1;
        productSelected = true;
      }
    });
    if (!productSelected) {
      const product = this.products.find(p => p.id === productId);
      this.selectedProducts.push(product);
    }
    this.selectedProducts$.next(this.selectedProducts);
    this.updateTotalPrice();
  }

  removeProduct(productId: number): void {
    let removeFromList = false;
    this.selectedProducts.forEach(p => {
      if (p.id === productId && p.unit > 1) {
        p.unit -= 1;
        removeFromList = true;
      }
    });
    if (!removeFromList) {
      this.selectedProducts = this.selectedProducts.filter(p => {
        if (p.id !== productId) {
          return p;
        }
      });
    }
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
