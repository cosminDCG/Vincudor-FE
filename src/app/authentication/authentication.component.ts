import { Component, OnInit } from '@angular/core';

import { UserService } from '../services/user-service/user.service';
import { GlobalService } from '../services/global-service/global.service';

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
  constructor(private userService:UserService,
              private globals:GlobalService) { }

  ngOnInit() {
  }

  toLogin(){
    this.activateLogin = 1;
  }

  toRegister(){
    this.activateLogin = 0;
  }

  register(){
    if(this.password != this.repeatPassword){
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
      this.activateLogin = 1;
    }, (err)=>{

    });
  }

  login(){
    var user ={
      email : this.logEmail,
      password : this.logPassword
    }

    this.userService.login(user).subscribe((res:any)=>{
      this.globals.currentUser = res.user;
    }, (err)=>{

    });
  }

}
