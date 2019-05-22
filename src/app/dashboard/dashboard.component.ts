import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from "@angular/router";

import { ProductService } from '../services/product-service/product.service';
import { GlobalService } from '../services/global-service/global.service';
import { NgxUiLoaderService } from 'ngx-ui-loader'; 
import { Options, LabelType, ChangeContext } from 'ng5-slider';
import { ToastrService } from 'ngx-toastr';

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
  public revFilter = 'Review';
  public activeFilter = 0;

  public itemAuxPrice: any;
  public addedItems: any[] = [];

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
              private ngxService: NgxUiLoaderService,
              private toastr: ToastrService) { }

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
      product_id: index,
      quantity: 1
    }

    this.productService.getItemsFromCart(this.user.user_id).subscribe((res:any)=>{
      this.toastr.success('', 'Added to Cart!');
      this.addedItems.push(index);
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

  selectRev(criteria){
    this.revFilter = criteria;
    this.items = this.itemsAux;
    this.activeFilter = 1;
    console.log(criteria);
    if(criteria === "High to Low"){
      this.items = this.items.sort((item1, item2)=> item2.avgReview - item1.avgReview);
    } else {
      this.items = this.items.sort((item1, item2)=> item1.avgReview - item2.avgReview);
    }
  }

  removeFilter(){
    this.items= this.itemsAux;
    this.colorFilter = 'Color';
    this.categoryFilter = 'Category';
    this.searchCriteria = '';
    this.revFilter = "Review";
    this.activeFilter = 0;
  }

  onPriceChange(changeContext: ChangeContext){
    if(this.itemAuxPrice != null)
      this.items = this.itemAuxPrice;
      else this.itemAuxPrice = this.items;
    this.items = this.items.filter(item => item.price >= changeContext.value && item.price <= changeContext.highValue);
  }
  
}
