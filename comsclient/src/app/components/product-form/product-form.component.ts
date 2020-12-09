import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  productForm: FormGroup;
  @Input() currentProduct:Product;
  @Input() isEdit:boolean;

  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      name:'',
      imageUrl:'',
      price:0,
      description:'',
      availableQuantity:0,
      unit:''

    })
    if(this.isEdit && this.currentProduct instanceof Product){
      this.loadData(this.currentProduct)
    }

  }

  ngOnChanges(changes:any){
    if(changes.currentProduct.currentValue){
    this.loadData(this.currentProduct);
    console.log("changes",this.isEdit);
    }
    
  }

  loadData(product:Product){
    this.productForm.patchValue({
      name:product.name,
      imageUrl:product.imageUrl,
      price:product.price,
      description:product.description,
      availableQuantity:product.availableQuantity,
      unit:product.unit
    })
  }

}
