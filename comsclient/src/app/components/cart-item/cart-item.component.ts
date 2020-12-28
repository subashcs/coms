import { Component, Input, OnInit, EventEmitter,Output} from '@angular/core';
import { CartItem } from 'src/app/models/cart/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  constructor(private cartService:CartService) { }
  @Input( ) item:CartItem;
  @Output() removeItem:EventEmitter<CartItem>=new EventEmitter();
  ngOnInit() {
  }
  removeCartItem(item:CartItem){
    this.removeItem.emit(item);
  }

}
