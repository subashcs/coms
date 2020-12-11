import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Product } from '../models/product/product.model';
import { Observable } from 'rxjs';

type ProductReturnType = {
  data:Array<Product>;
  totalCount:number;
  limit:number;
}
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productURL ='http://localhost:5000/v1/products';
  productLimit='?limit=5';
  productPage='&page=1';
 
  constructor(private http:HttpClient) {
    
  }

  getProducts(page:number,limit?:number):Observable<ProductReturnType>{
    
    let limitQuery = limit?`limit=${limit}`:'';
    let pageQuery = page?`page=${page}`:'';
    let queryParams = limitQuery?`?${limitQuery}&${pageQuery}`:`?${pageQuery}`;
    return this.http.get<ProductReturnType>(`${this.productURL}${queryParams}`)
  }

  updateProduct(product:Product):Observable<Product[]>{
    let url = `${this.productURL}/${product._id}`
    return this.http.patch<Product[]>(url,product);
  }
  deleteProduct(productId:string):Observable<any>{
    let url = `${this.productURL}/${productId}`
    return this.http.delete(url);
  }
  createProduct(product:Product):Observable<Product>{
    let url = `${this.productURL}`;
    return this.http.post<Product>(url,product);
  }
}
