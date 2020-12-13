import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS,HttpClientModule} from'@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthInterceptor } from './auth/auth.interceptor';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { ProductManagerComponent } from './components/product-manager/product-manager.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CustomersComponent } from './components/customers/customers.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AlertComponent } from './components/alert/alert.component';
import { AuthService } from './services/auth.service';
import { PaginationComponent } from './components/pagination/pagination.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    SignupComponent,
    ProductComponent,
    ProductsComponent,
    CartComponent,
    OrderComponent,
    CartItemComponent,
    ProductManagerComponent,
    ProfileComponent,
    CustomersComponent,
    ProductFormComponent,
    AlertComponent,
    PaginationComponent,
    OrderFormComponent,
    CheckoutComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
