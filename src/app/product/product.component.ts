import { Component, OnInit, HostListener } from '@angular/core';

import { GlobalService } from '../services/global-service/global.service';
import { ProductService } from '../services/product-service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public currentItem: any;
  public quantity = 0;

  constructor(private global:GlobalService,
              private productService:ProductService) { }

  ngOnInit() {
    if(localStorage.getItem('crUser') && this.global.currentUser == null) {
      var aux = localStorage.getItem('crUser');
      this.global.currentUser = JSON.parse(aux);
    }

    if(localStorage.getItem('crProd') && this.global.currentProductId == null) {
      var aux1 = localStorage.getItem('crProd');
      this.global.currentProductId = JSON.parse(aux1);
    }

    this.productService.getProductById(this.global.currentProductId).subscribe((res:any)=>{
      this.currentItem = res.wine;
    }, (err)=>{

    });
  }

  @HostListener('window:beforeunload') saveUser() {
    localStorage.setItem('crUser', JSON.stringify(this.global.currentUser));
    localStorage.setItem('crProd',JSON.stringify(this.global.currentProductId));
  }

  qtyPlus(){
    this.quantity++;
  }

  qtyMinus(){
    if(this.quantity > 0){
      this.quantity--;
    }
  }

}
