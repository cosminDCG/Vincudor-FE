import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(user) {
    return this.http.post('http://localhost:3000/user/register', user);
  }

  login(user) {
    return this.http.post('http://localhost:3000/user/login', user);
  }
}
