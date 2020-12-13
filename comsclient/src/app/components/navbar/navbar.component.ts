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
  isSuperAdmin:boolean;
  itemsInCart:number;
   constructor(private cartService:CartService ,private authService:AuthService,private router:Router,private route:ActivatedRoute){
    this.cartService.cartItems.subscribe((items)=>{
      this.itemsInCart = items.length;
    })
  }

  ngOnInit() {
    this.authService.currentUser.subscribe((userData:any)=>{
      if(userData){
        this.isLoggedIn=true;
        let userRole = userData.user?userData.user.role:"";
        this.isSuperAdmin= (userRole==="superadmin");
      }
      else{
        this.isLoggedIn=false;
        this.isSuperAdmin=false;
      }
    })
  
  }
  
  

 
  logout(){
    this.authService.logout()
  }
}
