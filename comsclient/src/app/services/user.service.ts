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
  userUrl = "http://localhost:5000/v1/users";
  constructor(private http: HttpClient) { }
   

    getAll(page:number,limit?:number) {
      let limitQuery = limit?`limit=${limit}`:'';
      let pageQuery = page?`page=${page}`:'';
      let queryParams = limitQuery?`?${limitQuery}&${pageQuery}`:`?${pageQuery}`;
      let url = `${this.userUrl}${queryParams}`;
        return this.http.get<UserQueryReturnType>(url);
    }

    getUser(user:string){
      let url =`${this.userUrl}/${user}`;
      return this.http.get(url);
    }
    updateUser(userId:string,body:any){
      let url  = `${this.userUrl}/${userId}`;
      return this.http.patch(url,body);
    }

    delete(id: string) {
        return this.http.delete(`${this.userUrl}/${id}`);
    }
}
