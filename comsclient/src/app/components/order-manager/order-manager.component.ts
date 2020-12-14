import { Component, OnInit } from '@angular/core';
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
  limit:number;
  customerId:string;
  constructor(private orderService:OrderService,private authService:AuthService) { }

  ngOnInit() {
      this.authService.currentUser.subscribe((curUser)=>{
        console.log(curUser);
        this.customerId = curUser.user._id;
      })
      this.loadOrders(1);

  }
  loadOrders(page:number,limit?:number){
    this.orderService.getAll(page,limit).subscribe(orders=>{
      this.orders = orders.data;
      this.totalCount = orders.totalCount;
      this.limit = orders.limit;
    })
  }


}
