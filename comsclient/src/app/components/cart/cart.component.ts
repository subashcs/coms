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
  totalPrice:number=0;
  constructor(private cartService:CartService) { }

  ngOnInit() {
    this.cart= this.cartService.getCartItems()
    this.updateTotal()
  }
  updateTotal(){
    let totalPrice=0;
    if(Array.isArray(this.cart)&& this.cart[0]){
      this.cart.forEach(item=>{
        totalPrice += item.price*item.quantity;
      })
    }
    this.totalPrice = totalPrice;
  }
  removeItem(cartItem:CartItem){
    const itemId =  cartItem.id;
    this.cart =this.cartService.removeCartItem(itemId);
    this.updateTotal();
  }
 

}
