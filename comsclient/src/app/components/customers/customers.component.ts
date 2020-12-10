import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  customers:User[];
  constructor(private userService:UserService) { }

  ngOnInit() {
    this.loadCustomers()
  }
  loadCustomers(){
    this.userService.getAll().subscribe(customers=>{
      console.log(customers);
      this.customers = customers})
  }

}
