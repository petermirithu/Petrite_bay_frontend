import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpHeaders, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CanActivate, Router} from '@angular/router';
import {tap,shareReplay,catchError} from 'rxjs/operators';
import { DatePipe } from '@angular/common';
// import * as jwtDecode from 'jwt-decode';
import jwt_decode from "jwt-decode";
import * as moment from 'moment';



@Injectable()
export class UserService {

  public baseUrl='https://petritebay.herokuapp.com';
  // public baseUrl='http://localhost:8000';  
    
  private httpOptions: any;

  constructor(private http: HttpClient, private router: Router){}

  private setSession(authResult){
    const token =authResult.token;
    const payload=<JWTPayload> jwt_decode(token);
    const expiresAt=moment.unix(payload.exp);          
    const user_id=authResult.user.pk;
    const username=authResult.user.username;
    const userdata={id:user_id,name:username}        
    localStorage.setItem('user_current', JSON.stringify(userdata));
    localStorage.setItem('token',authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));        
  }

  get token(): string{
    return localStorage.getItem('token')
  }

  get user_current(): any{    
    return JSON.parse(localStorage.getItem('user_current'));
  }

  loginUser(userData){
    return this.http.post(
      this.baseUrl.concat('/auth/login/'), userData
    ).pipe(
      tap(response => this.setSession(response)),
      shareReplay(),
    );
  }    

  signup(userData){
    return this.http.post(this.baseUrl.concat('/auth/signup/'), userData
    ).pipe(
      tap(response => this.setSession(response)),
      shareReplay(),
    );
  }

  profile(user_id){
    const url_s="/api/profile/"+user_id    
    return this.http.get(this.baseUrl.concat(url_s));
  }
  
  update_profile(profiledata, token){
    this.httpOptions={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT '+this.token
      })
    };        
    return this.http.post(this.baseUrl.concat('/api/updateprofile/'),profiledata, this.httpOptions)
  }

  send_message(messagedata){
    return this.http.post(this.baseUrl.concat('/api/send_message/'),messagedata)
  }

  
  // logout(){            
  //   const url_lg="/api/ty/logout/"              
  //   return this.http.get(this.baseUrl.concat(url_lg))
  // }

  logout(){
    localStorage.removeItem('user_current')
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');  
  }


  errorHandler(){
    this.logout();
    this.router.navigate(['signin']);
  }

  refreshToken(){
    const expiration = localStorage.getItem('expires_at');    
    const expiresAt = JSON.parse(expiration);           
    const myDate = new Date().getTime();    

    if ( myDate < expiresAt){
      if(moment().isBetween(this.getExpiration().subtract(1, 'days'), this.getExpiration())){            
        return this.http.post(this.baseUrl.concat('/api-token-refresh/'), {token: this.token}).pipe(
          tap(response => this.setSession(response)),shareReplay(),).subscribe()
      }      
    }
    else{
      this.errorHandler()
    }
  }

  

  getExpiration(){
    const expiration = localStorage.getItem('expires_at');    
    const expiresAt = JSON.parse(expiration);           
    return moment(expiresAt);
  }

  isLoggedIn(){    
    return moment().isBefore(this.getExpiration());    
  }
  isLoggedOut(){
    return !this.isLoggedIn();
  }  
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {  
  constructor(private userservice:UserService, private router :Router){}
  
  intercept(req:HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>>{    
    const token = localStorage.getItem('token');          
    
    if(token){            
      const cloned = req.clone({headers: req.headers.set("Authorization","JWT ".concat(token))});              
      return next.handle(cloned);                  
    }
    else{
      return next.handle(req);
    }
  }  
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userservice:UserService, private router :Router){}
  
  canActivate(){
    if(this.userservice.isLoggedIn()){
      this.userservice.refreshToken();            
      return true;
    }
    else{      
      this.userservice.logout();      
      this.router.navigate(['signin']);
      return false;
    }
  }
}

interface JWTPayload{
  user_id:number;
  username:string;
  email:string;
  exp:number;
}


