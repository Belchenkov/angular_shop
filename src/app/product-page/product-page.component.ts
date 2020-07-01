import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";

import { ProductService } from "../shared/product.service";
import { Product } from "../shared/interfaces";
import { switchMap } from "rxjs/operators";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  product$: Observable<Product>;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.product$ = this.route.params
      .pipe(switchMap(params => {
        return this.productService.getById(params['id']);
      }))
  }

  addProduct(product: Product) {
    this.productService.addProduct(product);
  }

}
