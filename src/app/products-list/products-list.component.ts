import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  constructor() { }

  products = [
    {
      id: 1,
      name: 'potatoes',
      unit: 1,
      price: 5
    },
    {
      id: 2,
      name: 'carrots',
      unit: 1,
      price: 4
    },
    {
      id: 3,
      name: 'onions',
      unit: 1,
      price: 2
    },
  ];

  ngOnInit(): void {
  }

  addToCart(productId: number): void {
  }

}
