import { Component, OnInit, HostListener } from '@angular/core';

import { ProductService } from '../services/product-service/product.service';
import { GlobalService } from '../services/global-service/global.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent implements OnInit {

  public items: any;
  public currentWine = {
    wine_name : '',
    type : ''
  };
  public editMode = 0;

  constructor(private global:GlobalService,
              private productService:ProductService) { }

  ngOnInit() {
    if(localStorage.getItem('crUser') && this.global.currentUser == null) {
      var aux = localStorage.getItem('crUser');
      this.global.currentUser = JSON.parse(aux);
    }

    this.productService.getWineByProducerId(this.global.currentUser.user_id).subscribe((res:any)=>{
      this.items = res.wines;
      console.log(this.items);
    })
  }

  @HostListener('window:beforeunload') saveUser() {
    localStorage.setItem('crUser', JSON.stringify(this.global.currentUser));
  }

  getWine(item){
    this.productService.getWineDetailsById(item.wine_id).subscribe((res:any)=>{
      this.currentWine = res.wine[0];
      console.log(this.currentWine);
    }, (err)=>{

    });
  }

  deleteProduct(item, index){
    this.productService.deleteWine(item).subscribe((res:any)=>{
      
    }, (err)=>{

    });
    this.items.splice(index,1);
  }

  enableEditMode(){
    this.editMode = 1;
  }

  saveChanges(){
    this.editMode = 0;
  }

}
