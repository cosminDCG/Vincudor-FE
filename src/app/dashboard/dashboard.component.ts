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

  constructor(private globals:GlobalService,
              private productService:ProductService,
              private router:Router) { }

  ngOnInit() {
    if(localStorage.getItem('crUser') && this.global.currentUser == null) {
      var aux = localStorage.getItem('crUser');
      this.global.currentUser = JSON.parse(aux);
    }

    this.user = this.globals.currentUser;
    this.productService.getAllProducts().subscribe((res:any)=>{
      this.items = res.wines;
      console.log(this.items);
    }, (err)=>{

    });
    
  }

  @HostListener('window:beforeunload') saveUser() {
    localStorage.setItem('crUser', JSON.stringify(this.global.currentUser));
  }

  seeItemDetails(item){
    this.globals.currentProductId = item.wine_id;
    this.router.navigate(['/product', item.wine_id]);
  }

  addToCart(index:number) {
    console.log("id product" + index);
    console.log("Id utilizator" + this.user.user_id);
    this.productService.addProductToCart(index,this.user.user_id);
    console.log("A mers");
    
  }
  
}
