import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order/order.model';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-manager',
  templateUrl: './order-manager.component.html',
  styleUrls: ['./order-manager.component.scss']
})
export class OrderManagerComponent implements OnInit {
  orders:Order[];
  totalCount:number;
  limit:number=3;
  customerId:string;
  constructor(private orderService:OrderService,
              private authService:AuthService,
              private router:Router
              ) 
              {

               }

  ngOnInit() {
      this.authService.currentUser.subscribe((curUser)=>{
        this.customerId = curUser.user._id;
      })
      this.loadOrders(1);

  }
  loadOrders(page:number){
    this.orderService.getAll(page,this.limit).subscribe(orders=>{
      this.orders = orders.data;
      this.totalCount = orders.totalCount;
      this.limit = orders.limit;
    })
  }
  onChangePage(page:number){
    this.loadOrders(page);
  }
  deleteOrder(order:Order){
    
  }

  editOrder(order:Order){
    this.router.navigate([`admin`,`orders`,`${order._id}`])
  }

}
