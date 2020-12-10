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
        return this.http.get<User[]>(`${this.userUrl}`);
    }

   

    delete(id: number) {
        return this.http.delete(`${this.userUrl}/${id}`);
    }
}
