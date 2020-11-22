import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {UserService} from '../auth/user.service'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public baseUrl=this.userservice.baseUrl
    
  private httpOptions: any;

  constructor(private http: HttpClient, private router: Router, private userservice:UserService){}

  private cartservice=new BehaviorSubject('');
  cartservice_variable=this.cartservice.asObservable();

  update_cart_bar(c_variable){
    this.cartservice.next(c_variable)
  }  
  
  getproducts(){
    const url_s="/api/products/"  
    return this.http.get(this.baseUrl.concat(url_s));
  }
  

  get_cart(user_id){
    const url="/api/cart/"+user_id    
    return this.http.get(this.baseUrl.concat(url));
  }

  get_past_orders(user_id){
    const url="/api/pastOrders/"+user_id    
    return this.http.get(this.baseUrl.concat(url));
  }
  
  get_bookings(user_id){
    const url="/api/getBookings/"+user_id
    return this.http.get(this.baseUrl.concat(url));
  }
  
  addToCart(prod){
    this.httpOptions={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT '+this.userservice.token
      })
    };        
    return this.http.post(this.baseUrl.concat('/api/add_to_cart/'),prod, this.httpOptions)
  }

  removeCart(user_id,product_id,token){
    this.httpOptions={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT '+this.userservice.token
      })
    };
    const url_r="/api/remove_from_cart/"+user_id+"/"+product_id
    return this.http.post(this.baseUrl.concat(url_r),this.httpOptions)
  }
  

  confirmOrder(order){
    this.httpOptions={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT '+this.userservice.token
      })
    };        
    return this.http.post(this.baseUrl.concat('/api/confirmOrder/'),order, this.httpOptions)
  }
  
  makeBooking(booking){
    this.httpOptions={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT '+this.userservice.token
      })
    };        
    return this.http.post(this.baseUrl.concat('/api/confirmBooking/'),booking, this.httpOptions) 
  }
}
