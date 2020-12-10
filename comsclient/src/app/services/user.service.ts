import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userUrl = "http://localhost:5000/v1/users"
  constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${this.userUrl}/users`);
    }

    register(user: User) {
        return this.http.post(`${this.userUrl}/users/register`, user);
    }

    delete(id: number) {
        return this.http.delete(`${this.userUrl}/users/${id}`);
    }
}
