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

  addProductToCart(product_id, user_id)
  {
    return this.http.post('http://localhost:3000/cart/add',user_id,product_id);
  }
  removeProductFromCart(user_id,product_id)
  {
    return this.http.post('http://localhost:3000/cart/delete',user_id,product_id);
  }
  getItemsFromCart(user_id){
    return this.http.get('http://localhost:3000/cart/all/' + user_id);
  }
}
