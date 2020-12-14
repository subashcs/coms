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

  getOrder(customerId:string,orderId:string):Observable<Order>{
    let url = `${this.orderUrl}/${customerId}/${orderId}`;
    return this.http.get<Order>(url);

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

 
  updateOrder(customerId:string,orderId:string,{paymentMethod,shippingStatus,shippingAddress}){

    let url = `${this.orderUrl}/${customerId}/${orderId}`;
    return this.http.patch(url,{paymentMethod,shippingStatus,shippingAddress});
  }

  deleteOrder(){
    
  }
}
