import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from "@angular/router";

import { ProductService } from '../services/product-service/product.service';
import { GlobalService } from '../services/global-service/global.service';
import { NgxUiLoaderService } from 'ngx-ui-loader'; 
import { Options, LabelType, ChangeContext } from 'ng5-slider';

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

  public itemsAux: any;
  public searchCriteria: any;

  public categoryFilter = 'Category';
  public colorFilter = 'Color';
  public activeFilter = 0;

  public itemAuxPrice: any;

  minValue: number = 0;
  maxValue: number = 50;
  options: Options = {
    floor: 0,
    ceil: 50,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return '<b>Min price:</b> ' + value;
        case LabelType.High:
          return '<b>Max price:</b> ' + value;
        default:
          return 'Lei ' + value;
      }
    }
  };

  constructor(private globals:GlobalService,
              private productService:ProductService,
              private router:Router,
              private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
    if(localStorage.getItem('crUser') && this.globals.currentUser == null) {
      var aux = localStorage.getItem('crUser');
      this.globals.currentUser = JSON.parse(aux);
    }
    this.isInCart = false;
    this.user = this.globals.currentUser;
    this.productService.getAllProducts().subscribe((res:any)=>{
      this.items = res.wines;
      this.itemsAux = this.items;
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

  async search(){
    this.ngxService.start();
   
    await new Promise((resolve)=>{setTimeout(() => {
      this.ngxService.stop();
      if(this.searchCriteria === '' || this.searchCriteria == null || !this.searchCriteria.replace(/\s/g, '').length){
        this.items = this.itemsAux;
        return;
      }
      this.items = this.itemsAux;
      this.items = this.items.filter(item => item.wine_name.toLowerCase().includes(this.searchCriteria.toLowerCase()) );  
      this.activeFilter = 1;
    }, 500);});
  }

  selectCategory(criteria){
    this.categoryFilter = criteria;
    this.items = this.itemsAux;
    this.activeFilter = 1;
    this.items = this.items.filter(item => item.type === criteria);
    this.colorFilter = 'Color';
  }

  selectColor(criteria){
    this.colorFilter = criteria;
    this.items = this.itemsAux;
    this.activeFilter = 1;
    this.items = this.items.filter(item => item.color === criteria);
    this.categoryFilter = 'Category';
  }

  removeFilter(){
    this.items= this.itemsAux;
    this.colorFilter = 'Color';
    this.categoryFilter = 'Category';
    this.searchCriteria = '';
    this.activeFilter = 0;
  }

  onPriceChange(changeContext: ChangeContext){
    if(this.itemAuxPrice != null)
      this.items = this.itemAuxPrice;
      else this.itemAuxPrice = this.items;
    this.items = this.items.filter(item => item.price >= changeContext.value && item.price <= changeContext.highValue);
  }
  
}
