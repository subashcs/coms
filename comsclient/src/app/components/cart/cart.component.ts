import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { CartItem} from 'src/app/models/cart/cart.model';
import { AlertService } from 'src/app/services/alert.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart:CartItem[];
  totalPrice:number=0;
  constructor(private cartService:CartService,private orderService:OrderService,private alertService:AlertService) { }

  ngOnInit() {
    this.cart= this.cartService.getCartItems()
    this.updateTotal()
  }
  updateTotal(){
    let totalPrice=0;
    if(Array.isArray(this.cart)&& this.cart[0]){
      this.cart.forEach(item=>{
        totalPrice += item.product.price*item.quantity;
      })
    }
    this.totalPrice = totalPrice;
  }
  removeItem(cartItem:CartItem){
    const itemId =  cartItem.product._id;
    this.cart =this.cartService.removeCartItem(itemId);
    this.updateTotal();
  }
 
  makeOrder(){
    let order = {
      shippingAddress:"Makhamalli Galli pokhara",
      paymentMethod:"cashondelivery",
      products:this.cart,
      sellingPrice:this.totalPrice,
      discountPercentage:0,
      markedPrice:this.totalPrice,
      
    }
    this.orderService.createOrder(order).pipe(first()).subscribe(
      res=>{
        console.log(res);
        this.alertService.success("Order placed Successfully");
      },error=>{
        this.alertService.error("Error adding order");
      });

  }

}
