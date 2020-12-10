import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn:boolean;
  itemsInCart:number;
   constructor(private cartService:CartService ,private authService:AuthService,private router:Router,private route:ActivatedRoute){
    this.cartService.cartItems.subscribe((items)=>{
      this.itemsInCart = items.length;
    })
  }

  ngOnInit() {
    this.authService.currentUser.subscribe((user:any)=>{
      if(user){
        this.isLoggedIn=true;
        
      }
      else{
        this.isLoggedIn=false
      }
    })
  
  }
  
  

 
  logout(){
    this.authService.logout()
  }
}
