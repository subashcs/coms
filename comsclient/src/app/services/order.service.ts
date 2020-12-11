import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order/order.model';

type OrderQueryReturnType = {
  data:Order[];
  totalCount:number;
  limit:number;
}
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderUrl = "http://localhost:5000/v1/orders"
  constructor(private http:HttpClient) {

   }
  getAll(page:number,limit?:number):Observable<OrderQueryReturnType> {
      let limitQuery = limit?`limit=${limit}`:'';
      let pageQuery = page?`page=${page}`:'';
      let queryParams = limitQuery?`?${limitQuery}&${pageQuery}`:`?${pageQuery}`;
      let url = `${this.orderUrl}${queryParams}`;
        return this.http.get<OrderQueryReturnType>(url);
  }
  getAllByCustomer(customerId:string,page:number,limit?:number):Observable<OrderQueryReturnType> {
      let limitQuery = limit?`limit=${limit}`:'';
      let pageQuery = page?`page=${page}`:'';
      let queryParams = limitQuery?`?${limitQuery}&${pageQuery}`:`?${pageQuery}`;
      let url = `${this.orderUrl}/${customerId}/${queryParams}`;
        return this.http.get<OrderQueryReturnType>(url);
  }

  createOrder(order:Order):Observable<Order>{
    let url = `${this.orderUrl}`;
    return this.http.post<Order>(url,order);
  }

  // mockFunction(){
  //   console.log("mock called");
  // }
  updateOrder(){

  }
  deleteOrder(){
    
  }
}
