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
  returnUrl: string;
  loading:boolean;

  constructor(
    private authService:AuthService,
    private alertService:AlertService, private fb:FormBuilder,
    private router:Router,
    private route:ActivatedRoute
    ) { 
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
  }
  }

  ngOnInit() {
    this.signupForm = this.fb.group({
      name:['',Validators.required],
      address:'',
      avatarUrl:'',
      email:['',Validators.email],
      password:['',Validators.required],
      confirmPassword:['',Validators.required]
    })
     // get return url from route parameters or default to '/'
     this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

   // convenience getter for easy access to form fields
   get f() { return this.signupForm.controls; }


  onSubmit(){
   let {name,email,address,avatarUrl,password,confirmPassword} = this.signupForm.value;

    if( this.signupForm.invalid || password!==confirmPassword) return;

    this.loading=true;

    this.authService.register({name,email,address,avatarUrl,password})
   .pipe(first())
   .subscribe(
       data => {
        this.alertService.success('Registration successful', true);
        this.router.navigate(['/login']);
       },
       error => {
        this.alertService.error(error.error.message);
           this.loading = false;
       }
       );
  }

}
