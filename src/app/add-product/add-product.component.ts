import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from "@angular/router";

import { GlobalService } from '../services/global-service/global.service';
import { ProductService } from '../services/product-service/product.service';


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
  public quantity = 0;
  public color = 'None';
  public description: any;
  public calculateQuality = 0;
  public user: any;

  constructor(private globals:GlobalService,
              private productService:ProductService,
              private router:Router) { }

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
    this.productService.calculateQuality(wine).subscribe((res:any)=>{
      if(res.quality == 1)
        this.quality = 'Medium';
        else if(res.quality == 2)
                this.quality = 'Poor';
                  else this.quality = 'High';
      this.calculateQuality = 1;
    }, (err)=>{

    })
    
  }

  qtyMinus(){
    if(this.quantity > 0)
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
