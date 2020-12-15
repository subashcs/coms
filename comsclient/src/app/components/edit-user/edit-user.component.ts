import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user/user.model';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  userForm :FormGroup;
  user:User;
  constructor(private fb:FormBuilder,
              private router:Router,
              private alertService:AlertService,
              private userService:UserService,
              private route:ActivatedRoute,
              private authService:AuthService) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      avatarUrl:'',
      name:'',
      address:'',
      phone:''
    })
    this.loadUser();
  }

  loadUser(){
    let email = this.route.snapshot.paramMap.get("email");
    this.authService.getUserProfile(email).subscribe((user:User)=>{
      this.userForm.patchValue({
        name:user.name,
        avatarUrl:user.avatarUrl,
        address:user.address,
        phone :user.phone,
      });
      this.user= user;
    });
  }
  

  onSubmit(){
    console.log("submitting",this.userForm.value,this.userForm.valid);
    let {name,avatarUrl,address,phone} = this.userForm.value;
    if(this.userForm.valid){
      this.userService.updateUser(this.user._id,{name,avatarUrl,address,phone}).subscribe(user=>{
        this.alertService.success("user updated successfully");
        // this.router.navigate(["/profile"]);
      },err=>{
        this.alertService.error("Error updating details");
      })
    }
  }

}
