import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../domain/product";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartRoute = 'http://localhost:8088/api/cart'

  constructor(private http: HttpClient) {
  }

  addToCart(product: Product): Observable<string> {
    console.log("I am alive")
    console.log("Url - " + this.cartRoute + '/' + product.id)
    return this.http.post<string>(this.cartRoute + '/' + product.id, {}, {withCredentials: true})
  }

  viewCart(): Observable<Product[]> {
    return this.http.get<Product[]>(this.cartRoute, {withCredentials: true})
  }

  removeProductFromCart(product: Product): Observable<number> {
    return this.http.delete<number>(this.cartRoute + '/' + product.id, {withCredentials: true})
  }
}
