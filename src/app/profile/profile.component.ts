import { Component, OnInit } from '@angular/core';

import { GlobalService } from '../services/global-service/global.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user: any;
  public editMode = 0;

  constructor(private globals:GlobalService) { }

  ngOnInit() {
    this.user = this.globals.currentUser;
  }

  enableEditMode() {
    this.editMode = 1;
  }

  disableEditMode(){
    this.editMode = 0;
  }

}
