import { Component, OnInit } from '@angular/core';
import { ProductsList } from '../productsList';
import { ProductInterface } from '../product.interface';

// SERVICES
import { CartService } from '../cart.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products: ProductInterface[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.loadProductsList();
  }

  loadProductsList(): void {
    this.products = this.cartService.getAllProducts();
  }

  addToCart(productId: number): void {
    this.cartService.addProduct(productId);
  }

}
