import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order/order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orders:Order[];
  constructor() { }

  ngOnInit() {
    
  }

}
