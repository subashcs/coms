import { Injectable } from '@angular/core';
import { User } from '../models/user/user.model';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
  authUrl ="http://localhost:5000/v1/auth";

  constructor(private http:HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email:string,password:string){
    const loginUrl = this.authUrl+"/login";
    let reqBody = {email,password};

    return this.http.post<any>(loginUrl, { email, password })
    .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
    }));

  }

 

  register(user: User) {
    const signupUrl = `${this.authUrl}/register`;

    return this.http.post(signupUrl, user);
}
  
  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
}

}
