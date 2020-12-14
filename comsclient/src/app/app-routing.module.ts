import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessGuard } from './auth/access.guard';
import { AuthGuard } from './auth/auth.guard';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CustomersComponent } from './components/customers/customers.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { EditOrderComponent } from './components/order-manager/edit/edit.component';
import { OrderManagerComponent } from './components/order-manager/order-manager.component';
import { OrderComponent } from './components/order/order.component';
import { ProductManagerComponent } from './components/product-manager/product-manager.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';


const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'cart',component:CartComponent},
  {path:'orders',component:OrderComponent,canActivate:[AuthGuard]},
  {path:'customers',component:CustomersComponent,canActivate:[AuthGuard,AccessGuard]},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
  {path:'checkout',component:CheckoutComponent},

  {path:'admin',
  canActivate:[AuthGuard,AccessGuard],
  children:[
    {path:'products',component:ProductManagerComponent},
    {path:'orders',component:OrderManagerComponent},
    {path:'orders/:orderId',component:EditOrderComponent}
  ]
},
  {path:'',component:DashboardComponent}
];

@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
