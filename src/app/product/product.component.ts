import { Component, OnInit } from '@angular/core';

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
    this.productService.getProductById(this.global.currentProductId).subscribe((res:any)=>{
      this.currentItem = res.wine;
    }, (err)=>{

    });
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
