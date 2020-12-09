import { Component, OnInit } from '@angular/core';
import { CartItem} from 'src/app/models/cart/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart:CartItem[];
  constructor(private cartService:CartService) { }

  ngOnInit() {
    this.cart= this.cartService.getCartItems()

  }

}
