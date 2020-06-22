import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

import { environment } from "../../environments/environment";
import { FbResponse, Product } from "./interfaces";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  type = 'phone';

  constructor(
    private http: HttpClient
  ) { }

  create(product) {
    return this.http.post(`${environment.FB_URL}/products.json`, product)
      .pipe(map((res: FbResponse) => {
        return {
          ...product,
          id: res.name,
          date: new Date(product.date)
        }
      }));
  }

  getAll() {
    return this.http.get(`${environment.FB_URL}/products.json`)
      .pipe(map((res: FbResponse) => {
        return Object.keys(res)
          .map(key => ({
            ...res[key],
            id: key,
            date: new Date(res[key].date)
          }))
      }));
  }

  getById(id) {
    return this.http.get(`${environment.FB_URL}/products/${id}.json`)
      .pipe(map((res: Product) => {
        return {
            ...res,
            id,
            date: new Date(res.date)
          }
      }));
  }

  remove(id) {
    return this.http.delete(`${environment.FB_URL}/products/${id}.json`);
  }

  update(product: Product) {
    console.log(product)
    return this.http.patch(`${environment.FB_URL}/products/${product.id}.json`, product);
  }

  setType(type: string) {
    this.type = type;
  }
}
