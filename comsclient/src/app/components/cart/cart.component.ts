import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem} from 'src/app/models/cart/cart.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart:CartItem[];
  totalPrice:number=0;
  isLoggedIn:boolean;

  constructor(private cartService:CartService,
    private authService:AuthService,
    private router:Router) { }

  ngOnInit(){
    this.authService.currentUser.subscribe((user:any)=>{
      if(user){
        this.isLoggedIn=true;
        
      }
      else{
        this.isLoggedIn=false
      }
    })
    this.cart= this.cartService.getCartItems()
    this.updateTotal();
  }

  updateTotal(){
    this.totalPrice = this.cartService.calculateTotalPrice(this.cart);
  }

  removeItem(cartItem:CartItem){
    const itemId =  cartItem.product._id;
    this.cart =this.cartService.removeCartItem(itemId);
    this.updateTotal();
  }
 
  proceedToCheckout(){
    this.router.navigate(['/checkout'])
  } 

}
