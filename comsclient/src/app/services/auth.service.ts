import { Injectable } from '@angular/core';
import { User } from '../models/user/user.model';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type UserWithToken = {user:User,tokens:{access:{token:string,expires:string},refresh:{token:string,expires:string}}}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private currentUserSubject: BehaviorSubject<UserWithToken>;
    public currentUser: Observable<UserWithToken>;
  authUrl ="http://localhost:5000/v1/auth";

  constructor(private http:HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<UserWithToken>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
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
  
  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
   get accessToken(){
     if(!this.currentUserValue){return ""}
    let currentUserTokens = this.currentUserValue.tokens;
    return currentUserTokens.access.token; 
  }

}
