import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { UserService } from '../services/user-service/user.service';
import { GlobalService } from '../services/global-service/global.service';
import { NgModel, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  public activateLogin = 0;

  public firstName: any;
  public lastName: any;
  public email: any;
  public city: any;
  public phoneNumber: any;
  public password: any;
  public repeatPassword: any;

  public logEmail: any;
  public logPassword: any;

  //validation

  public firstNameValid:any = true;
  public lasNameValid:any =true;
  public emailValid:any = true;
  public cityValid:any = true;
  public phoneNumberValid:any = true;
  public passwordValid: any = true;
  public repeatPasswordValid:any = true;

  constructor(private userService:UserService,
              private globals:GlobalService,
              private router: Router) { }

  ngOnInit() {
  }

  toLogin(){
    this.activateLogin = 1;
  }

  toRegister(){
    this.activateLogin = 0;
  }

  register(){

    
    const textReg = /^[a-zA-Z ]+$/;
    const emailReg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    const numericReg = /^[0-9]*$/;

    this.firstNameValid = textReg.test(this.firstName);
    console.log("first: " + this.firstNameValid);
    this.lasNameValid = textReg.test(this.lastName);
    console.log("last: " + this.lasNameValid);
    this.emailValid = emailReg.test(this.email);
    console.log("email: " + this.emailValid);
    this.cityValid = textReg.test(this.city);
    console.log("city: " + this.cityValid);
    this.phoneNumberValid = textReg.test(this.phoneNumber);
    console.log("phone: " + this.phoneNumberValid);
    this.passwordValid = textReg.test(this.password);
    console.log("password: " + this.passwordValid);
    this.repeatPasswordValid = textReg.test(this.repeatPassword);
    console.log("repeat password: " + this.repeatPasswordValid);

    if((this.password != this.repeatPassword) || !this.firstNameValid || !this.lasNameValid || !this.emailValid || !this.cityValid || !this.phoneNumberValid ){
      return;
    }
    var user = {
      first_name : this.firstName,
      last_name : this.lastName,
      email : this.email,
      city : this.city,
      phone_number : this.phoneNumber,
      password : this.password
    }
    
    this.userService.register(user).subscribe((res:any)=>{
      
    }, (err)=>{

    });
    this.activateLogin = 1;
  }

  login(){
    var user ={
      email : this.logEmail,
      password : this.logPassword
    }

    this.userService.login(user).subscribe((res:any)=>{
      this.globals.currentUser = res.user;
      this.router.navigate(['/user/profile', res.user.user_id]);
    }, (err)=>{

    });
  }

}
