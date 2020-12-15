import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  customers:Array<User>;
  totalCount:number;
  limit:number;
  constructor(private userService:UserService,private router:Router) { }

  ngOnInit() {
    this.loadCustomers(1)
  }
  loadCustomers(page:number){
    console.log("reload customers",page);
    this.userService.getAll(page,this.limit).subscribe(customers=>{
      this.customers = customers.data;
      this.totalCount = customers.totalCount;
      this.limit = customers.limit;
    })
  }
  onChangePage(page:number){
    this.loadCustomers(page);
  }
  deleteCustomer(customerId:string){
    this.userService.delete(customerId).subscribe(res=>{
      this.loadCustomers(1);
    },err=>{
      console.log(err);
    })
  }
  editCustomer(email:string){
    this.router.navigate(["profile","edit",email])

  }

}
