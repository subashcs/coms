import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }
  getCartItems(){
    let cartItems = JSON.parse(localStorage.getItem("cart"));
    return cartItems
  }
  setCartItems(cartItem:CartItem){
    let cartItems = JSON.parse(localStorage.getItem("cart"))||[];
    let isItemExist = false;
    cartItems.forEach(element => {
      if(element.id===cartItem.id){
        isItemExist = true;
      }
    });
    if(!isItemExist)cartItems.push(cartItem);
    let cartItemsString = JSON.stringify(cartItems);
    localStorage.setItem("cart",cartItemsString);
    return cartItems;
    
  }
  removeCartItem(cartItemId:string){
    console.log("removing",cartItemId);
    let cartItems = JSON.parse(localStorage.getItem("cart"))||[];
    
    cartItems = cartItems.filter(item=>item.id!==cartItemId);
    let cartItemsString = JSON.stringify(cartItems);
    localStorage.setItem("cart",cartItemsString);
    console.log(cartItems);
    return cartItems;
  }

}
