import { Component, HostListener, Input, OnInit } from '@angular/core';
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
  avatarUrl : string;
  itemsInCart:number = 0;
  isScrolled = false;
   constructor(private cartService:CartService ,private authService:AuthService,private router:Router,private route:ActivatedRoute){
    this.cartService.cartItems.subscribe((items)=>{
      this.itemsInCart = items.length || 0;
    })
  }


  ngOnInit() {
    this.authService.currentUser.subscribe((userData:any)=>{
      if(userData){
        this.isLoggedIn=true;
        let user = userData.user?userData.user:"";
        this.avatarUrl = user.avatarUrl;
        this.isSuperAdmin= (user.role==="superadmin");
      }
      else{
        this.isLoggedIn=false;
        this.isSuperAdmin=false;
      }
    })
  
  }

  @HostListener("window:scroll")
  scrollEvent() {
    console.log("scrolling");
      this.isScrolled=window.pageYOffset >= 80;
  }


 
  logout(){
    this.authService.logout()
  }
}
