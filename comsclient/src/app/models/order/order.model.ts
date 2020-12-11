import { Product } from '../product/product.model';
import { User } from '../user/user.model';
 

export class Order{
    _id?:string;
    customer?:User;
    products:Array<{product:Product,quantity:number}>;
    shippingStatus?:"shipped"|"not-shipped";
    shippingAddress:string;
    paymentMethod:string;
    markedPrice:number;
    discountPercentage:number;
    sellingPrice:number;
    createdAt?:string;
    updatedAt?:string;
}