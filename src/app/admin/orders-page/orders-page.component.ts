import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

import { Product } from "../../shared/interfaces";
import { ProductService } from "../../shared/product.service";
import { OrderService } from "../../shared/order.service";

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.scss']
})
export class OrdersPageComponent implements OnInit {
  orders = [];
  pSub: Subscription;
  rSub: Subscription;

  constructor(
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.pSub = this.orderService.getAll().subscribe(orders => {
      this.orders = orders;
    });
  }

  remove(id) {
    this.rSub = this.orderService.remove(id).subscribe(() => {
      this.orders = this.orders.filter(o => o.id !== id);
    });
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }

    if (this.rSub) {
      this.rSub.unsubscribe();
    }
  }

}
