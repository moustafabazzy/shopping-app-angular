import { Component, OnInit } from '@angular/core';
import { ProductsList } from '../productsList';

// SERVICES
import { CartService } from '../cart.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products = ProductsList

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  addToCart(productId: number): void {
    this.cartService.addProduct(productId);
  }

}
