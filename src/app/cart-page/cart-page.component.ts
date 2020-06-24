import { Component, OnInit } from '@angular/core';

import { ProductService } from "../shared/product.service";
import { Product } from "../shared/interfaces";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  cartProducts: Product[] = [];
  totalPrice = 0;

  constructor(
    public productService: ProductService
  ) { }

  ngOnInit() {
    this.cartProducts = this.productService.cartProducts;

    for(let i = 0; i < this.cartProducts.length; i++) {
      this.totalPrice += +this.cartProducts[i].price;
    }
  }

}
