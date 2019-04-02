import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../services/global-service/global.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  public quality = 0;
  public user: any;

  constructor(private globals:GlobalService) { }

  ngOnInit() {
    this.user = this.globals.currentUser;
  }

}
