import {Injectable} from '@angular/core';
import {Product} from "../domain/product";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productsRoute = 'http://localhost:8088/api/product'

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.request<Product[]>("GET", this.productsRoute, {
      headers:
        new HttpHeaders({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          //'Access-Control-Max-Age': '86400'
        })
      , withCredentials: true
    })
  }
}
