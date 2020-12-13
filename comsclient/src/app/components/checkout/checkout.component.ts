import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CartItem } from 'src/app/models/cart/cart.model';
import { AlertService } from 'src/app/services/alert.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm:FormGroup;

  constructor(private fb:FormBuilder,private cartService:CartService,private orderService:OrderService,private alertService:AlertService) { }

  ngOnInit() {
    this.checkoutForm = this.fb.group({
      country:'',
      city:'',
      addressLine:'',
      postalCode:'',
      paymentMethod:''
    })
  }

  onSubmit(){
    let cartItems:CartItem[] = this.cartService.getCartItems();
    let totalPrice = this.cartService.calculateTotalPrice(cartItems);
    
    console.log(this.checkoutForm.value)

    let order = this.makeOrderPayload();
    this.orderService.createOrder(order).pipe(first()).subscribe(
      res=>{
        console.log(res);
        this.alertService.success("Order placed Successfully");
      },error=>{
        this.alertService.error("Error adding order");
      });
  }
  makeOrderPayload(){
    let cartItems:CartItem[] = this.cartService.getCartItems();
    let totalPrice = this.cartService.calculateTotalPrice(cartItems);
    let {country,city,addressLine,postalCode,paymentMethod}=this.checkoutForm.value;
    let shippingAddress = `${postalCode} ${addressLine}, ${city}, ${country}`;
    
    let order = {
      shippingAddress,
      paymentMethod:paymentMethod,
      products:cartItems,
      sellingPrice:totalPrice,
      discountPercentage:0,
      markedPrice:totalPrice,
      
    }
    return order;
    

  } 

}
