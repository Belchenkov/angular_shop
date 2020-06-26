import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { ProductService } from "../shared/product.service";
import { Product } from "../shared/interfaces";
import { OrderService } from "../shared/order.service";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  cartProducts: Product[] = [];
  totalPrice = 0;
  form: FormGroup;
  submitted = false;

  constructor(
    public productService: ProductService,
    public orderService: OrderService
  ) { }

  ngOnInit() {
    this.cartProducts = this.productService.cartProducts;

    for(let i = 0; i < this.cartProducts.length; i++) {
      this.totalPrice += +this.cartProducts[i].price;
    }

    this.form = new FormGroup({
      payment: new FormControl('cash'),
      name: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required)
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const order = {
      payment: this.form.value.payment,
      name: this.form.value.name,
      phone: this.form.value.phone,
      address: this.form.value.address,
      price: this.totalPrice,
      orders: this.cartProducts,
      date: new Date()
    };

    this.orderService.create(order).subscribe(res => {
      this.form.reset();
      this.submitted = false;
    });
  }

  delete(product) {
    this.totalPrice -= +product.price;
    this.cartProducts.splice(this.cartProducts.indexOf(product), 1);
  }

}
