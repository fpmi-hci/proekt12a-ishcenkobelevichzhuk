import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../domain/product";
import {CartService} from "../service/cart.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  @Input() product?: Product

  isSubscribed: boolean = false;

  constructor(private cartService: CartService) {
  }

  ngOnInit(): void {
  }

  onAddToCart(): void {
    if (this.product)
      this.cartService.addToCart(this.product)
  }
}
