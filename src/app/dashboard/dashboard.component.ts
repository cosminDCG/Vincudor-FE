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

  constructor(private global:GlobalService,
              private productService:ProductService,
              private router:Router) { }

  ngOnInit() {
    if(localStorage.getItem('crUser') && this.global.currentUser == null) {
      var aux = localStorage.getItem('crUser');
      this.global.currentUser = JSON.parse(aux);
    }

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
    this.global.currentProductId = item.wine_id;
    this.router.navigate(['/product', item.wine_id]);
  }
  
}
