import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from "@angular/router";

import { ProductService } from '../services/product-service/product.service';
import { GlobalService } from '../services/global-service/global.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public items: any;
  public user:any;
  public products:any[];
  public index_array:any;
  public isInCart:any;
  public index_products:any;

  constructor(private globals:GlobalService,
              private productService:ProductService,
              private router:Router) { }

  ngOnInit() {
    if(localStorage.getItem('crUser') && this.globals.currentUser == null) {
      var aux = localStorage.getItem('crUser');
      this.globals.currentUser = JSON.parse(aux);
    }
    this.isInCart = false;
    this.user = this.globals.currentUser;
    this.productService.getAllProducts().subscribe((res:any)=>{
      this.items = res.wines;
      console.log(this.items);
    }, (err)=>{

    });
    
  }

  @HostListener('window:beforeunload') saveUser() {
    localStorage.setItem('crUser', JSON.stringify(this.globals.currentUser));
  }

  seeItemDetails(item){
    this.globals.currentProductId = item.wine_id;
    this.router.navigate(['/product', item.wine_id]);
  }

  addToCart(index:number) {
    var cart = {
      user_id: this.user.user_id,
      product_id: index
    }
    console.log("id product" + index);
    console.log("Id utilizator" + this.user.user_id);

    this.productService.getItemsFromCart(this.user.user_id).subscribe((res:any)=>{
      this.products = res.cart;
      this.index_array = 0;
      for(this.index_array = 0; this.index_array <= this.products.length; this.index_array++)
      {
          if(this.products[this.index_array].Id == index) 
                  { this.isInCart = true; this.index_products = this.index_array;}
      }
    }, (err)=>{
    });

    if(this.isInCart == false)
    {
      this.productService.addProductToCart(cart).subscribe((res:any)=>{
      }, (err)=>{
      });
    }
    else {
      this.products[this.index_products].quantity ++;
    }
  }
  
}
