import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productURL :'http://localhost:5000/v1/products';
  productLimit:'?limit=5'
  productPage:'&page=1'
  products=  [
    {
      id:"2131231323",
      name:"Samsung mobile",
      imageUrl:"https://images.samsung.com/is/image/samsung/au-galaxy-s20-plus-5g-g986-sm-g986bzpaxsa-frontbpurple-thumb-261021455",
      price:230,
      description:"samsung mobile is the most exciting inno keen thing to catch up with",
      availableQuantity:300,
      unit:"units"
    },
    {
      id:"213123ad1df323",
      name:"Apple mobile",
      imageUrl:"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone11-red-select-2019?wid=940&hei=1112&fmt=png-alpha&qlt=80&.v=1566956144763",
      price:230,
      description:"Apple mobile is the most exciting inno keen thing to catch up with",
      availableQuantity:300,
      unit:"units"

    },
    {
      id:"213123ad1df323",
      name:"Xiomi m22",
      imageUrl:"https://www.gizmochina.com/wp-content/uploads/2019/09/Xiaomi-Redmi-Note-8-1-500x500.jpg",
      price:230,
      description:"Xiomi mobile is the most exciting inno keen thing to catch up with",
      availableQuantity:300,
      unit:"units"
    }
  ]
  constructor(private http:HttpClient) {
    
   }

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.productURL}${this.productLimit}${this.productPage}`)
  }
  updateProduct(product:Product):Observable<any>{
    let url = `${this.productURL}/${product.id}`
    return this.http.put<Product>(url,product);
  }
  deleteProduct(productId:string):Observable<any>{
    let url = `${this.productURL}/${productId}`
    return this.http.delete(url);
  }
}
