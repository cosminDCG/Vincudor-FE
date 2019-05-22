import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import * as $ from 'jquery';
import { NgxUiLoaderModule } from  'ngx-ui-loader';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Ng5SliderModule } from 'ng5-slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ProfileComponent } from './profile/profile.component';
import { MenuComponent } from './menu/menu.component';
import { AddProductComponent } from './add-product/add-product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { MyProductsComponent } from './my-products/my-products.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    ProfileComponent,
    MenuComponent,
    AddProductComponent,
    DashboardComponent,
    ProductComponent,
    CartComponent,
    MyProductsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxUiLoaderModule,
    NgbModule,
    Ng5SliderModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 1200,
      preventDuplicates: true
    }),
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'authentication',
        component: AuthenticationComponent
      },
      {
        path: 'user/profile/:id',
        component: ProfileComponent
      },
      {
        path: 'menu',
        component: MenuComponent
      },
      {
        path: 'product/insert',
        component: AddProductComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {

         path: 'cart',
         component: CartComponent
      },
      {
        path: 'product/:id',
        component: ProductComponent
      },
      {
        path: 'user/products',
        component: MyProductsComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
