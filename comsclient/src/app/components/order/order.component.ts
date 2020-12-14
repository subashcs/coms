import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order/order.model';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orders:Order[];
  totalCount:number;
  limit:number=10;
  customerId:string;
  constructor(private orderService:OrderService,private authService:AuthService) { }

  ngOnInit() {
      this.authService.currentUser.subscribe((curUser)=>{
        console.log(curUser);
        this.customerId = curUser.user._id;
      })
      this.loadOrders(1);

  }
  loadOrders(page:number){
    this.orderService.getAllByCustomer(this.customerId,page,this.limit).subscribe(orders=>{
      this.orders = orders.data;
      this.totalCount = orders.totalCount;
      this.limit = orders.limit;
    })
  }

  onChangePage(page:number){
    this.loadOrders(page);
  }
}
