import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn:boolean = false;
  private user:any = {};
  private token = '';
  constructor(private http: HttpClient) {
    let token = localStorage.getItem("token");
    if(token){
      this.loggedIn = true;
      this.token = token;
    }
  }
  register(body: any){
    return this.http.post('http://localhost:3000/api/users', body )
  }
  login(body: any){
    return this.http.post('http://localhost:3000/api/users/login', body )
  }
  logUserIn(user:any){
    this.loggedIn = true;
    this.user = user;
    this.token = user.token;
    localStorage.setItem("token", user.token);
  }
  isLoggedIn(){
    return this.loggedIn;
  }
  getToken(){
    return this.token;
  }
}
