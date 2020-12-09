import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
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

  constructor(private productService:ProductService) { }

  ngOnInit() {
    this.products = this.productService.products;
  }
  editProduct(product:Product){
    this.currentProduct = product;
    this.isEdit= true;
  }

}
