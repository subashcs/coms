import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn:boolean;
 
   constructor(private authService:AuthService,private router:Router,private route:ActivatedRoute){
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
