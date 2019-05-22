import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, HostListener } from '@angular/core';

import { IProduct } from "../product/iproduct";
import { Subject } from 'rxjs';
import { OriginalSource } from 'webpack-sources';
import { ProductService } from '../services/product-service/product.service';
import { ToastrService } from 'ngx-toastr';

import { GlobalService } from '../services/global-service/global.service';
import { totalmem } from 'os';

@Component({
selector: 'app-cart',
templateUrl: './cart.component.html',
styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  public firstName:any;
  public email: any;
  public address: any;
  public city:any;
  public state:any;
  public zip:any;
  public cardname:any;
  public cardnumber:any;
  public expmonth:any;
  public expyear:any;
  public cvv:any;

  //Validation
  public firstNameValid:any;
  public emailValid:any;
  public addressValid:any;
  public cityValid:any;
  public stateValid:any;
  public zipValid:any;
  public cardNameValid:any;
  public cardNumberValid:any;
  public expmonthValid:any;
  public expyearVaiid:any;
  public cvvValid:any;

  public cartChanged = 0;

  products: any[];
  upproducts: any[] = [];
  selectedProduct : Subject<any> = new Subject;
  total:number = 0;
  public isViewable: boolean;
  public isCheckout: boolean;
  public user :any;

  constructor(private global:GlobalService,
    private productService:ProductService,
    private toastr: ToastrService) {
  
  }
  
  ngOnInit() {
    if(localStorage.getItem('crUser') && this.global.currentUser == null) {
      var aux = localStorage.getItem('crUser');
      this.global.currentUser = JSON.parse(aux);
    }

    this.user = this.global.currentUser;
    console.log("User ID: " + this.user.user_id);
    this.productService.getItemsFromCart(this.user.user_id).subscribe((res:any)=>{
      this.products = res.cart;
      this.totalPrice();  
    }, (err)=>{
      
    });
    
    this.isViewable = true;
      this.isCheckout = false;
      
    }

  @HostListener('window:beforeunload') saveUser() {
    localStorage.setItem('crUser', JSON.stringify(this.global.currentUser));
  }

  getpopup(det) {
    this.selectedProduct.next(det);
  }

  delpopup(pid){
  
    for(var i=0;i<this.products.length;i++){
      if(this.products[i].wine_id === pid)
      {  
        this.products.splice(i,1);
        var cart = {
          user_id:    this.user.user_id,
          product_id: pid
        }
        console.log(cart);
        this.productService.removeProductFromCart(cart).subscribe((res:any)=>{
          
        }, (err)=>{
    
        });
      }           
    }
    this.toastr.error('', 'Deleted from Cart!');
    this.totalPrice();
  }


  totalPrice(){
    this.total = 0;
    for(var i=0;i<this.products.length;i++){
      this.total += (this.products[i].price * this.products[i].quantity);
    }
    return this.total;
  }

  add(item){
  
    item.quantity++;
    this.totalPrice();
    this.cartChanged = 1;
  }

  del(item){
    if(item.quantity>1)
      item.quantity--;
    this.totalPrice();
    this.cartChanged = 1;
  }

  goToCheckout() {
    this.isViewable = false;
  }

  onSubmit() {
    const textReg = /^[a-zA-Z ]+$/;
    const emailReg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    const numericReg = /^[0-9]*$/;

    this.firstNameValid = textReg.test(this.firstName); 
    console.log("name " +this.firstNameValid);
    this.emailValid = emailReg.test(this.email);
    console.log("Email: " + this.emailValid);
    //this.addressValid = textReg.test(this.address);
    console.log("address: " + this.addressValid);
    this.cityValid = textReg.test(this.city);
    console.log("city: " + this.cityValid);
    this.stateValid = textReg.test(this.state);
    console.log("state: " + this.stateValid);
    this.zipValid = numericReg.test(this.zip);
    console.log("zip: " + this.zipValid);
    this.cardNameValid = textReg.test(this.cardname);
    console.log("card name: " + this.cardNameValid);
    this.cardNumberValid = numericReg.test(this.cardnumber);
    console.log("card number: " + this.cardNumberValid);
    this.expmonthValid = numericReg.test(this.expmonth);
    console.log("expp month: " + this.expmonthValid);
    this.expyearVaiid = numericReg.test(this.expyear);
    console.log("exp year: " + this.expyearVaiid);
    this.cvvValid = numericReg.test(this.cvv);
    console.log("cvv: " + this.cvvValid);

    
    var auxProduct:any[] = [];
    let  i:number;
    for(i = 0; i < this.products.length; i++)
    {
      var orderDetails = {
        wine_id: this.products[i].wine_id,
        quantity: this.products[i].quantity
      }
      auxProduct.push(orderDetails);
    }
    var finalAdress: string;
    finalAdress = this.address + " ; " + this.city + " ; " + this.state + " ; " + this.zip;

    var order = {
      products: auxProduct,
      adresa: finalAdress,
      user_id: this.user.user_id
    }

    if(this.firstNameValid && this.emailValid  && this.cityValid && this.stateValid && this.zipValid && this.cardNameValid && this.cardNumberValid && this.cvvValid && this.expmonthValid && this.expyearVaiid
      )
      {
        this.productService.addAnOrder(order).subscribe((res:any)=>{
          
        }, (err)=>{
    
        });
    
        this.isCheckout = true; 
      }

    
  }

  updateCart(){
    this.productService.updateCart(this.global.currentUser.user_id, this.products).subscribe((res:any)=>{
      
    }, (err)=>{

    });
    this.toastr.success('', 'Successfully Updated!');
    this.cartChanged = 0;
  }


}

