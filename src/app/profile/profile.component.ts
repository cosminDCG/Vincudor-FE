import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from "@angular/router";

import { GlobalService } from '../services/global-service/global.service';
import { UserService } from '../services/user-service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user: any;
  public editMode = 0;

  constructor(private globals:GlobalService,
              private userService:UserService,
              private router:Router) { }

  ngOnInit() {
    if(localStorage.getItem('crUser') && this.globals.currentUser == null) {
      var aux = localStorage.getItem('crUser');
      this.globals.currentUser = JSON.parse(aux);
    }
    this.user = this.globals.currentUser;
  }

  @HostListener('window:beforeunload') saveUser() {
    localStorage.setItem('crUser', JSON.stringify(this.globals.currentUser));
  }

  enableEditMode() {
    this.editMode = 1;
  }

  disableEditMode(){
    var user = {
      user_id: this.user.user_id,
      first_name : this.user.first_name,
      last_name : this.user.last_name,
      email : this.user.email,
      city : this.user.city,
      phone_number : this.user.phone_number,
      password : this.user.password
    }
    this.userService.edit(user).subscribe((res:any)=>{
      
    }, (err)=>{

    });
    this.editMode = 0;
  }

  delete(){
    this.userService.delete(this.user).subscribe((res:any)=>{
      
    }, (err)=>{

    });

    this.router.navigate(['/authentication']);
  }

}
