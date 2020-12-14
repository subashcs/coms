import { Injectable } from '@angular/core';
import { User } from '../models/user/user.model';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertService } from './alert.service';

type UserWithToken = {user:User,tokens:{access:{token:string,expires:string},refresh:{token:string,expires:string}}}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private currentUserSubject: BehaviorSubject<UserWithToken>;
    public currentUser: Observable<UserWithToken>;
  authUrl ="http://localhost:5000/v1/auth";

  constructor(private http:HttpClient,private alertService:AlertService) { 
    this.currentUserSubject = new BehaviorSubject<UserWithToken>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.isTokenExpired();

  }
  public get currentUserValue(): UserWithToken {
    return this.currentUserSubject.value;
  }

  login(email:string,password:string){
    const loginUrl = this.authUrl+"/login";

    return this.http.post<any>(loginUrl, { email, password })
    .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
    }));

  }

 

  register(user: {name:string,email:string,avatarUrl:string,address:string,password:string}) {
    const signupUrl = `${this.authUrl}/register`;

    return this.http.post(signupUrl, user); 
  }

  getUserProfile(email:string){
    let url = `${this.authUrl}/profile?email=${email}`;
    return this.http.get(url);
  }

  logout() {
    let reqBody = {refreshToken:this.currentUserValue.tokens.refresh.token || ""};
    const logoutUrl = `${this.authUrl}/logout`;

    this.http.post(logoutUrl,reqBody).subscribe( (res)=>{
    /**
     *   remove user from local storage and set current user to null
      */
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
    },
     error => {
      this.alertService.error("Error Logging Out");
     })
  }

   get accessToken(){
     if(!this.currentUserValue){return ""}
    let currentUserTokens = this.currentUserValue.tokens;
    return currentUserTokens.access.token; 
  }
   hasTokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
   isTokenExpired(){
    if(!this.currentUserValue){return ;}
    let currentUserTokens = this.currentUserValue.tokens;
    let token= currentUserTokens.access.token; 
    if( this.hasTokenExpired(token)){
      this.clearUserCredentials();
    }
  }
  clearUserCredentials(){
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }



}
