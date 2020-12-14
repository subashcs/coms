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
  totalCount:number;
  perPageCount:number = 10;
  constructor(private productService:ProductService) { }

  ngOnInit() {
   this.loadProducts(1);
  }
  loadProducts(page:number){
    this.productService.getProducts(page,this.perPageCount).subscribe(res=>{
      this.products = res.data
      this.totalCount = res.totalCount;
    });
  } 
  onChangePage(page:number){
    this.loadProducts(page);
  }

}
