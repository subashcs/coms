import { Component, OnInit } from '@angular/core';
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
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.loadCustomers(1)
  }
  loadCustomers(page:number,limit?:number){
    console.log("reload customers",page,limit);
    this.userService.getAll(page,limit).subscribe(customers=>{
      this.customers = customers.data;
      this.totalCount = customers.totalCount;
      this.limit = customers.limit;
    })
  }
  onChangePage(page:number){
    this.loadCustomers(page);
  }

}
