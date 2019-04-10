import { Component, OnInit, HostListener } from '@angular/core';

import { GlobalService } from '../services/global-service/global.service';
import { ProductService } from '../services/product-service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public currentItem: any;
  public quantity = 0;
  public commentList = [
                        { user_id:1,
                          user_first_name:"Madalin",
                          user_last_name:"Benchia",
                          comment_text:"Aceste este un comentariu text"
                        }
  ];
  public isSpecificUser = false;
  public commentContent: string;
  public user: any;
  public editMode = 0;

  constructor(private global:GlobalService,
              private productService:ProductService) { }

  ngOnInit() {
    if(localStorage.getItem('crUser') && this.global.currentUser == null) {
      var aux = localStorage.getItem('crUser');
      this.global.currentUser = JSON.parse(aux);
    }

    if(localStorage.getItem('crProd') && this.global.currentProductId == null) {
      var aux1 = localStorage.getItem('crProd');
      this.global.currentProductId = JSON.parse(aux1);
    }
    this.user = this.global.currentUser;
    console.log("Global user id" + this.global.currentUser.user_id);

    this.productService.getProductById(this.global.currentProductId).subscribe((res:any)=>{
      this.currentItem = res.wine;
    }, (err)=>{

    });
  }

  @HostListener('window:beforeunload') saveUser() {
    localStorage.setItem('crUser', JSON.stringify(this.global.currentUser));
    localStorage.setItem('crProd',JSON.stringify(this.global.currentProductId));
  }

  qtyPlus(){
    this.quantity++;
  }

  qtyMinus(){
    if(this.quantity > 0){
      this.quantity--;
    }
  }
  addComment() {
    var comment = {
                    user_id: this.user.user_id,
                    user_first_name: this.user.first_name,
                    user_last_name: this.user.last_name,
                    comment_text: this.commentContent
    }
    this.commentList.push(comment);
    console.log(this.commentList.length);
  } 
  
  deleteComment(text:string) {
    
    for(var i = 0; i < this.commentList.length; i++)
    {
      
      if(text === this.commentList[i].comment_text)
      {
        
        this.commentList.splice(i,1);
      }
    }
  }

  enableEditMode() {
    this.editMode = 1;
  }

  
}
