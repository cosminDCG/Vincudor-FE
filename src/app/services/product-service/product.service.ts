import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  addProduct(product){
    return this.http.post('http://localhost:3000/wine/newWine', product);
  }

  getAllProducts(){
    return this.http.get('http://localhost:3000/wines/all');
  }

  getProductById(wineId){
    return this.http.get('http://localhost:3000/wines/' + wineId);
  }

  addProductToCart(cart)
  {
    return this.http.post('http://localhost:3000/cart/add',cart);
  }
  removeProductFromCart(cart)
  {
    return this.http.post('http://localhost:3000/cart/delete',cart);
  }
  getItemsFromCart(user_id){
    return this.http.get('http://localhost:3000/cart/all/' + user_id);
  }

  addAnOrder(order)
  {
    return this.http.post('http://localhost:3000/order/new',order);
  }

  addCommentForAProduct(comment) {
    return this.http.post('http:localhost:3000/comment/add', comment);
  }

  deleteCommentForAProduct(comment) {
    return this.http.post('http://localhost:3000/comment/delete', comment);
  }

  editCommentForAProduct(comment) {
    return this.http.post('http://localhost:3000/comment/edit',comment);
  }
}
