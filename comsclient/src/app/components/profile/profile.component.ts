import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user:any;
  constructor(private userService:UserService,private router:Router,private authService:AuthService) { }

  ngOnInit() {
    this.loadUser();
  }
  loadUser(){ 
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if(!currentUser) return;
    let email = currentUser.user?currentUser.user.email:"";
    this.authService.getUserProfile(email).subscribe(user=>{
      this.user = user;
    });
  }
  editProfile(email:string){
    this.router.navigate(["profile","edit",email])

  } 
}
