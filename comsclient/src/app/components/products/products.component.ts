import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products:Product[];
  constructor(private productService:ProductService) { }

  ngOnInit() {
   this.loadProducts();
  }
  loadProducts(){
    this.productService.getProducts().subscribe(products=>{
      this.products = products
    });
  } 
  

}
