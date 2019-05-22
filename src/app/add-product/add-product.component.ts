import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from "@angular/router";

import { GlobalService } from '../services/global-service/global.service';
import { ProductService } from '../services/product-service/product.service';

import { NgxUiLoaderService } from 'ngx-ui-loader'; 


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  public productName: any;
  public type = 'None';
  public fixedAcidity: any;
  public volatileAcidity: any;
  public citricAcid: any;
  public residualSugar: any;
  public chlorides: any;
  public freeSulfurDioxide: any;
  public totalSulfurDioxide: any;
  public density: any;
  public pH: any;
  public sulphates: any;
  public alcohol : any;
  public quality = '0';
  public price: any;
  public quantity = 1;
  public color = 'None';
  public description: any;
  public calculateQuality = 0;
  public user: any;

  public showNameError = 0;
  public showTypeError = 0;
  public showColorError = 0;
  public showPriceError = 0;
  public showPropertiesError = 0;

  constructor(private globals:GlobalService,
              private productService:ProductService,
              private router:Router,
              private ngxService: NgxUiLoaderService) { }

  ngOnInit() {
    this.user = this.globals.currentUser;
    if(localStorage.getItem('crUser') && this.globals.currentUser == null) {
      var aux = localStorage.getItem('crUser');
      this.globals.currentUser = JSON.parse(aux);
      this.user = this.globals.currentUser;
    }
  }

  @HostListener('window:beforeunload') saveUser() {
    localStorage.setItem('crUser', JSON.stringify(this.globals.currentUser));
  }

  generateQuality(){
    this.showPropertiesError = 0;

    var wine = {
      producer_id : this.globals.currentUser.user_id,
      wine_name : this.productName,
      type : this.type,
      fixed_acidity : this.fixedAcidity,
      volatile_acidity : this.volatileAcidity,
      citric_acid : this.citricAcid,
      residual_sugar : this.residualSugar,
      chlorides : this.chlorides,
      free_sulfur_dioxide : this.freeSulfurDioxide,
      total_sulfur_dioxide : this.totalSulfurDioxide,
      density : this.density,
      pH : this.pH,
      sulphates : this.sulphates,
      alcohol : this.alcohol,
      quality : '',
      price : this.price,
      quantity : this.quantity,
      color : this.color,
      description : this.description
    }

    if(this.fixedAcidity == null || this.volatileAcidity == null || this.citricAcid == null || this.residualSugar == null || this.chlorides == null ||
      this.freeSulfurDioxide == null || this.totalSulfurDioxide == null || this.density == null || this.pH == null || this.sulphates == null ||
      this.alcohol == 0 ){
        this.showPropertiesError = 1;
        return;
      }
      
    this.ngxService.start();
    this.productService.calculateQuality(wine).subscribe((res:any)=>{
      if(res.quality == 1)
        this.quality = 'Medium';
        else if(res.quality == 2)
                this.quality = 'Poor';
                  else this.quality = 'High';
      this.calculateQuality = 1;
      this.ngxService.stop();
    }, (err)=>{

    })
    
  }

  qtyMinus(){
    if(this.quantity > 1)
      this.quantity --;
  }

  qtyPlus(){
    this.quantity ++;
  }

  chooseType(option){
    this.type = option;
  }

  chooseColor(option){
    this.color = option;
  }

  addProduct(){
    this.showColorError = 0;
    this.showNameError = 0;
    this.showTypeError = 0;
    this.showPriceError = 0;
    this.showPropertiesError = 0;

    var product = {
      producer_id: this.user.user_id,
      wine_name: this.productName,
      type: this.type,
      fixed_acidity: this.fixedAcidity,
      volatile_acidity: this.volatileAcidity,
      citric_acid: this.citricAcid,
      residual_sugar: this.residualSugar,
      chlorides: this.chlorides,
      free_sulfur_dioxide: this.freeSulfurDioxide,
      total_sulfur_dioxide: this.totalSulfurDioxide,
      density: this.density,
      pH: this.pH,
      sulphates: this.sulphates,
      alcohol: this.alcohol,
      quality: this.quality,
      price: this.price,
      quantity: this.quantity,
      color: this.color,
      description: this.description
    }

    if(this.productName == '' || this.productName == null)
      this.showNameError = 1;

    if(this.type == 'Type')
      this.showTypeError = 1;

    if(this.color == 'None')
      this.showColorError = 1;

    if(this.price == '' || this.price == null)
      this.showPriceError = 1;

    if(this.showColorError == 1 || this.showTypeError == 1 || this.showNameError == 1 || this.showPriceError == 1){
      return;
    }

    this.productService.addProduct(product).subscribe((res:any)=>{
      
    }, (err)=>{

    });

    this.router.navigate(['/dashboard']);
  }
  setPrice(){
    if(this.quality == 'Medium')
      {
        if(this.price > 15 || this.price < 10)
          this.price = '';
      }

      if(this.quality == 'Poor')
      {
        if(this.price > 9 || this.price < 5)
          this.price = '';
      }

      if(this.quality == 'High')
      {
        if(this.price > 20 || this.price < 15)
          this.price = '';
      }

      if(this.price < 0)
        this.price = '';
  }

}
