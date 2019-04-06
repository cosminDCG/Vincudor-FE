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
}
