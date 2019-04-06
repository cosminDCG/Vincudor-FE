import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  currentUser: any;
  currentProductId: any;

  constructor() { }
}
