import { Component, OnInit } from '@angular/core';
import {CartService} from "../service/cart.service";
import {Product} from "../domain/product";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartService:CartService) { }

  products: Product[] = []

  ngOnInit(): void {
    this.cartService.viewCart().subscribe(ps => this.products=ps)
  }

  onSubmitOrder():void{

  }

}
