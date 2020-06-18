import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from "rxjs";

import { ProductService } from "../../shared/product.service";
import {Product} from "../../shared/interfaces";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  pSub: Subscription;
  rSub: Subscription;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.pSub = this.productService.getAll().subscribe(products => {
      this.products = products;
    });
  }

  remove(id) {
    this.rSub = this.productService.remove(id).subscribe(() => {
      this.products = this.products.filter(p => p.id !== id);
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
