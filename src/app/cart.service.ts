import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductsList } from './productsList';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  products = ProductsList;
  totalPrice = 0;
  selectedProducts = [];
  selectedProducts$: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor() { }

  getSelectedProducts() {
    return this.selectedProducts$.asObservable();
  }

  addProduct(productId: number): void {
    const product = this.products.find(p => p.id === productId);
    this.selectedProducts.push(product);
    this.selectedProducts$.next(this.selectedProducts);
  }

  removeProduct(productId: number): void {
    this.selectedProducts = this.selectedProducts.map(product => {
      if (product.id !== productId) {
        return product;
      }
    });
    this.selectedProducts$.next(this.selectedProducts);
    this.updateTotalPrice();
  }

  updateTotalPrice(): void {
    this.totalPrice = 0;
    this.selectedProducts.forEach(product => {
      this.totalPrice += product.units * product.price;
    });
  }
}
