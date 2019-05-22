import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {AuthenticationComponent} from '../app/authentication/authentication.component';
import {ProfileComponent} from '../app/profile/profile.component';
import {MenuComponent} from '../app/menu/menu.component';
import {AddProductComponent} from '../app/add-product/add-product.component';
import {DashboardComponent} from '../app/dashboard/dashboard.component';
import {ProductComponent} from '../app/product/product.component';
import {CartComponent} from '../app/cart/cart.component';
import {MyProductsComponent} from '../app/my-products/my-products.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule, NgModel } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng5SliderModule } from 'ng5-slider';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

describe('AppComponent', () => {

  const routes:Routes =[
      {path:'authentication', component: AuthenticationComponent},
      {path: 'user/profile/:id',
      component: ProfileComponent},
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
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot(routes),
        BrowserModule,
        NgModule,
        AppRoutingModule,  
        ReactiveFormsModule,
        NgxUiLoaderModule,
        NgbModule,
        Ng5SliderModule,
        HttpClientModule,
      ],
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
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'vincudor-FE'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('vincudor-FE');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to vincudor-FE!');
  });
});
