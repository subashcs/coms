import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user/user.model';

type UserQueryReturnType = {
  data:User[];
  totalCount:number;
  limit:number;
}
@Injectable({
  providedIn: 'root'
})

export class UserService {
  userUrl = "http://localhost:5000/v1/users"
  constructor(private http: HttpClient) { }

    getAll(page:number,limit?:number) {
      let limitQuery = limit?`limit=${limit}`:'';
      let pageQuery = page?`page=${page}`:'';
      let queryParams = limitQuery?`?${limitQuery}&${pageQuery}`:`?${pageQuery}`;
      let url = `${this.userUrl}${queryParams}`;
        return this.http.get<UserQueryReturnType>(url);
    }

   

    delete(id: number) {
        return this.http.delete(`${this.userUrl}/${id}`);
    }
}
