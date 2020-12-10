import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import { first } from 'rxjs/operators';
import { Product } from 'src/app/models/product/product.model';
import { AlertService } from 'src/app/services/alert.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  productForm: FormGroup;
  @Input() currentProduct:Product;
  @Input() isEdit:boolean;
  @Output() reloadProducts:EventEmitter<Product>=new EventEmitter();

  constructor(private fb:FormBuilder,private productService:ProductService,private alertService:AlertService) { }

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
  resetData(){
    this.productForm.patchValue({
      name:'',
      imageUrl:'',
      price:0,
      description:'',
      availableQuantity:'',
      unit:''
    })
  }

  onSubmit(){
    if(this.productForm.valid){
      let {name,imageUrl,price,description,availableQuantity,unit} = this.productForm.value;
      /****
       * Conditon to check whether to update or create
       */
      if(this.isEdit){
        /**
         * Update
         */
        this.productService.updateProduct({_id:this.currentProduct._id,name,imageUrl,price,description,availableQuantity,unit}).pipe(first()).subscribe(
          res=>{
            this.reloadProducts.emit();
            this.resetData();
            this.alertService.success("Registration Successful");
          },error=>{
            this.alertService.error("Error Updating Product");
          })
        
      }
      else{
        /**
         * Create
         */
        this.productService.createProduct({name,imageUrl,price,description,availableQuantity,unit}).pipe(first()).subscribe(
        res=>{
          this.reloadProducts.emit();
          this.resetData();
          this.alertService.success("Registration Successful");
        },error=>{
          this.alertService.error("Error adding Product");
        })
      }
    }
  }

}
