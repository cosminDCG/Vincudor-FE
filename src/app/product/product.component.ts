import { Component, OnInit, HostListener } from '@angular/core';

import { GlobalService } from '../services/global-service/global.service';
import { ProductService } from '../services/product-service/product.service';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {

  public editedComment:any;
  public editedSubComment:any;
  public currentItem: any;
  public quantity = 0;
 /* public commentList = [
                        { user_id:1,
                          user_first_name:"Madalin",
                          user_last_name:"Benchia",
                          comment_text:"Aceste este un comentariu text"
                        }
  ];*/

  public commentList: any;
  public isSpecificUser = false;
  public commentContent: string;
  public SubcommentContent: string;
  public user: any;
  public editMode = 0;
  public editModeSubcomm = 0;
  public oldIndex: any;
  public repliedMode = 0;
  public replyComment:any;

  public rating = 0;

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

    this.productService.getProductById(this.global.currentProductId, this.global.currentUser.user_id).subscribe((res:any)=>{
      this.currentItem = res.wine;
      this.commentList = res.wine.comments;
      //console.log("Res: " + res.wine.comments);
    }, (err)=>{

    });

    console.log(this.commentList.length);
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
                    //comment_id: 1,
                    user_id: this.user.user_id,
                    wine_id: this.currentItem.wine_id,
                    comment: this.commentContent,
                    replied_to:  -1
    }

    if(comment.comment !== "")
        this.productService.addCommentForAProduct(comment).subscribe((res:any) => {
            console.log("l-am introdous");
        }, (err) => {
        });
    //this.commentList.push(comment);
    console.log(comment);
    this.commentContent="";
    this.disableReplyMode();
    
    this.commentList.push(comment);
    location.reload();

  } 
  
  deleteComment(item) {
    for(var i = 0; i < this.commentList.length; i++)
    {
      
      if(item.comment === this.commentList[i].comment)
      {
        console.log("Comment ID:" + item.comment_id)
        this.commentList.splice(i,1);
      }
    }

    this.productService.deleteCommentForAProduct(item).subscribe((res:any) => {
        console.log("L-am sters");
    }, (err) => {
    });
  }

  enableEditMode(item) {
    this.editMode = 1;
    this.oldIndex = item.comment_id;
    this.editedComment = item.comment;
    console.log(item.comment_id);
  }

  enableEditModeSubcomm(item) {
    this.editModeSubcomm = 1;
    this.oldIndex = item.comment_id;
    this.editedSubComment = item.comment;
    console.log(item.replied_to);
  }

 
  saveChanges(item) {
    item.comment = this.editedComment;
    this.disableEditMode();
    
    this.productService.editCommentForAProduct(item).subscribe((res:any) => {
      console.log("l-am editat");
    }, (err) => {
    });
  }

  saveChangesSubComm(item) {
    item.comment = this.editedSubComment;
    this.disableEditModeSubcomm();
    
    this.productService.editCommentForAProduct(item).subscribe((res:any) => {
      console.log("l-am editat");
    }, (err) => {
    });
  }

  disableEditMode() {
    this.editMode = 0 ;
  }

  disableEditModeSubcomm() {
    this.editModeSubcomm = 0 ;
  }

  disableReplyMode() {
    this.repliedMode= 0;
  }

  enableReplyMode(item) {
    this.repliedMode = 1;
    this.replyComment = item.comment_id;

    console.log(this.repliedMode);
  }

  addReplyComment(item) {
      this.enableReplyMode(item);
      var comment = {
        //comment_id: 1,
        user_id: this.user.user_id,
        wine_id: this.currentItem.wine_id,
        comment: this.SubcommentContent,
        replied_to: item.comment_id
      }

      if(comment.comment !== "")
      this.productService.addCommentForAProduct(comment).subscribe((res:any) => {
          console.log("l-am introdous");
      }, (err) => {
      });

      console.log(comment);
      this.commentContent="";
      this.disableReplyMode();
      this.commentList.push(comment);
      this.productService.getProductById(this.global.currentProductId).subscribe((res:any)=>{
        this.currentItem = res.wine;
        this.commentList = res.wine.comments;
        //console.log("Res: " + res.wine.comments);
      }, (err)=>{
  
      });
      location.reload();
  }

  addToCart(index:number) {
    var cart = {
      user_id: this.user.user_id,
      product_id: index
    }
    console.log("id product" + index);
    console.log("Id utilizator" + this.user.user_id);
    this.productService.addProductToCart(cart).subscribe((res:any)=>{

    }, (err)=>{

    });
    console.log("A mers");
    
  }

  giveRating(i){
    this.rating = i;
  }

  
}
