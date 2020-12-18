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
  public products: ProductInterface[] = [];

  constructor(private cartService: CartService) { }

  public ngOnInit(): void {
    this.loadProductsList();
  }

  private loadProductsList(): void {
    this.products = this.cartService.getAllProducts();
  }

  public addToCart(productId: number): void {
    this.cartService.addProduct(productId);
  }
}
