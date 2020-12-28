import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.scss']
})
export class ProductManagerComponent implements OnInit {
  products:Product[];
  currentProduct:Product;
  isEdit=false;
  totalCount:number;
  limit:number=2;
  
  constructor(private productService:ProductService) { }

  ngOnInit() {
    this.loadProducts();
  }
  
  loadProducts(page?:number){
     page = page?page:1;
    this.productService.getProducts(page,this.limit).subscribe(res=>{
      this.products = res.data
      this.totalCount=res.totalCount;
      this.limit = res.limit;
    });
  }  
  editProduct(product:Product){
    this.currentProduct = product;
    this.isEdit= true;
  }
  addProductForm(){
    this.isEdit=false;
    this.currentProduct={
      id:'',
      name:'',
      imageUrl:'',
      price:0,
      description:'',
      availableQuantity:0,
      unit:''
    }
  }
  deleteProduct(product:Product){
   if( !window.confirm("Are you sure, You want to delete this product?")) return;
    if(!product._id) return;
    this.productService.deleteProduct(product._id).subscribe(product=>{
      this.loadProducts();
    })
  }
  onChangePage(page:number){
    this.loadProducts(page);

  }

}
