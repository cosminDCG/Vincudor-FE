import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

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
    type : '',
    color: '',
    quality: '',
    price: '0'
  };
  public editMode = 0;

  constructor(private global:GlobalService,
              private productService:ProductService,
              private router:Router) { }

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
    this.productService.editWine(this.currentWine).subscribe((res:any)=>{
      
    }, (err)=>{

    });
    this.editMode = 0;
    window.location.reload();
  }

  chooseType(option){
    this.currentWine.type = option;
  }

  chooseColor(option){
    this.currentWine.color = option;
  }

  changeQuality($event){
    this.productService.calculateQuality(this.currentWine).subscribe((res:any)=>{
      if(res.quality == 1)
        this.currentWine.quality = 'Medium';
        else if(res.quality == 2)
              this.currentWine.quality = 'Poor';
                  else this.currentWine.quality = 'High';
    }, (err)=>{

    })
  }

  setPrice(){
    if(this.currentWine.quality == 'Medium')
      {
        if(parseFloat(this.currentWine.price) > 15 || parseFloat(this.currentWine.price) < 10)
          this.currentWine.price = '';
      }

      if(this.currentWine.quality == 'Poor')
      {
        if(parseFloat(this.currentWine.price) > 9 || parseFloat(this.currentWine.price) < 5)
          this.currentWine.price = '';
      }

      if(this.currentWine.quality == 'High')
      {
        if(parseFloat(this.currentWine.price) > 20 || parseFloat(this.currentWine.price) < 15)
          this.currentWine.price = '';
      }

      if(parseFloat(this.currentWine.price) < 0)
        this.currentWine.price = '';
  }
}
