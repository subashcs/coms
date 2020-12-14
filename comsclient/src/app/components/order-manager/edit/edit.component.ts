import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/order/order.model';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditOrderComponent implements OnInit {
   order:Order;
   orderId:string;
   orderForm:FormGroup
  constructor(
              private orderService:OrderService,
              private route:ActivatedRoute,
              private authService:AuthService,
              private alertService:AlertService,
              private fb:FormBuilder) { }

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get('orderId')
    this.loadOrder(this.orderId);
    this.orderForm = this.fb.group({
        shippingAddress:'',
        paymentMethod:'',
        shippingStatus:''
    })

  }
  loadOrder(orderId:string){
    let currentUser = this.authService.currentUserValue.user;

    this.orderService.getOrder(currentUser._id,orderId).subscribe((order:Order)=>{
        this.order = order;
        this.orderForm.patchValue({
          shippingAddress:order.shippingAddress,
          shippingStatus:order.shippingStatus,
          paymentMethod:order.paymentMethod
        })
    })  

  }

  updateOrder(){
    let currentUser = this.authService.currentUserValue.user;
    if(this.orderForm.invalid) return;
    this.orderService.updateOrder(currentUser._id,this.order._id,this.orderForm.value).subscribe((res)=>{
      this.alertService.success("Update Successfully");
    })

  }
}
