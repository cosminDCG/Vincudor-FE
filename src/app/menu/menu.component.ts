import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { GlobalService } from '../services/global-service/global.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router:Router,
              private global:GlobalService) { }

  ngOnInit() {
  }

}
