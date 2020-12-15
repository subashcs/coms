import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  userForm :FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      avatarUrl:'',
      name:'rajan',
      address:'',
      phone:''
    })
  }

  loadUsers(){

  }
  onSubmit(){
    console.log("submitting");
  }

}
