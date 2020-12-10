import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  isLoggedIn = false;
  returnUrl: string;
  loading:boolean;
  constructor(
    private authService:AuthService,
    private alertService:AlertService, private fb:FormBuilder,
    private router:Router,
    private route:ActivatedRoute
    ) { 
    if (this.authService.currentUserValue) {
      this.isLoggedIn=true;
      this.router.navigate(['/']);
  }
  }

  ngOnInit() {
    this.signupForm = this.fb.group({
      email:['',Validators.email],
      password:['',Validators.required],
      

    })
     // get return url from route parameters or default to '/'
     this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

   // convenience getter for easy access to form fields
   get f() { return this.signupForm.controls; }


  login(){
   let {email,password} = this.signupForm.value;
    if( this.signupForm.invalid) return;
   this.authService.login(email,password).subscribe((res)=>console.log(res));
   this.authService.login(this.f.email.value, this.f.password.value)
   .pipe(first())
   .subscribe(
       data => {
           this.router.navigate([this.returnUrl]);
       },
       error => {
        this.alertService.error(error);
           this.loading = false;
       });
  }

}
