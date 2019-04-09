
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Component, OnInit, HostListener } from '@angular/core';

import { IProduct } from "../product/iproduct";
import { Subject } from 'rxjs';
import { OriginalSource } from 'webpack-sources';
import { ProductService } from '../services/product-service/product.service';
import { GlobalService } from '../services/global-service/global.service';

import { GlobalService } from '../services/global-service/global.service';

@Component({
selector: 'app-cart',
templateUrl: './cart.component.html',
styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  public firstName:any;
  public email: any;
  public address: any;
  public city:any;
  public state:any;
  public zip:any;
  public cardname:any;
  public cardnumber:any;
  public expmonth:any;
  public expyear:any;
  public cvv:any;

  products: any[];
  upproducts: any[] = [];
  selectedProduct : Subject<any> = new Subject;
  total:number = 0;
  public isViewable: boolean;
  public isCheckout: boolean;
  public user :any;
  constructor(private global:GlobalService,
    private productService:ProductService) {
    
  }

  ngOnInit() {
    this.user = this.global.currentUser;
    console.log("Mama");
    this.productService.getItemsFromCart(this.user.user_id).subscribe((res:any)=>{
      console.log(res.length);
    }, (err)=>{

    });


  public user:any;

  
  constructor(private global:GlobalService) {
    this.products = [
                      {id:1, wine_name:'Purcari Rose', description:'Aceasta este o descriere', price:20,quantity:1},
                      {id:2, wine_name:'Purcari Rose', description:'Aceasta este o descriere', price:40,quantity:1}
                    ];
  }

  ngOnInit() {
    if(localStorage.getItem('crUser') && this.global.currentUser == null) {
      var aux = localStorage.getItem('crUser');
      this.global.currentUser = JSON.parse(aux);
    }
    this.user = this.global.currentUser;

      this.totalPrice();
      this.isViewable = true;
      this.isCheckout = false;
  }

  @HostListener('window:beforeunload') saveUser() {
    localStorage.setItem('crUser', JSON.stringify(this.global.currentUser));
  }

  getpopup(det) {
    this.selectedProduct.next(det);
  }

  delpopup(pid){
    console.log(pid);
    for(var i=0;i<this.products.length;i++){
      if(this.products[i].id === pid)
      {  
        this.products.splice(i,1);
      }           
    }
    this.totalPrice();
    console.log(this.products);
  }


  totalPrice(){
    this.total = 0;
    for(var i=0;i<this.products.length;i++){
      this.total += (this.products[i].price * this.products[i].quantity);
    }
  }

  add(pid){
    console.log(pid);
    for(var i=0;i<this.products.length;i++){
      if(this.products[i].id === pid)
      {  
        this.products[i].quantity += 1;
      }           
    }
    this.totalPrice();
    console.log(this.products);
  }

  del(pid){
    console.log(pid);
    for(var i=0;i<this.products.length;i++){
      if(this.products[i].id === pid)
      {
        if(this.products[i].quantity > 1)
        {
          this.products[i].quantity -= 1;
        }  
        else {
          this.delpopup(this.products[i].id);
        }
      }           
    }
    this.totalPrice();
    console.log(this.products);
  }

  goToCheckout() {
    this.isViewable = false;
  }

  onSubmit() {
    var order = {
      first_name : this.firstName,
      city : this.city
    }
    this.isCheckout = true; 
  }


}

