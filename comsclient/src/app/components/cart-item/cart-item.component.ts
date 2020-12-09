import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart/cart.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  constructor() { }
  @Input( ) item:CartItem;

  ngOnInit() {
  }

}
