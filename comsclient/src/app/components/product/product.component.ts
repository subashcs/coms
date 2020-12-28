import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart/cart.model';
import { Product } from 'src/app/models/product/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input( ) product:Product;

  constructor(private cartService:CartService) { }

  ngOnInit() {
  }
  
  addToCart(product:Product){
    console.log("product to cart",product);
    let cartItem:CartItem = {product,quantity:3};
    this.cartService.setCartItems(cartItem);
  }
  

}
