import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public loggedIn:boolean = false;
  public user:any = {};
  private token = '';
  public loginStatus: EventEmitter<any>;
  public regisStatus: EventEmitter<any>;
  public settingStatus: EventEmitter<any>;

  constructor(private http: HttpClient) {
    this.loginStatus = new EventEmitter();
    this.regisStatus = new EventEmitter();
    this.settingStatus = new EventEmitter();
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
  updateUser(userUpdate: any){
    return this.http.put('http://localhost:3000/api/user', userUpdate)
  }
  getCurrentUser(){
    return this.http.get('http://localhost:3000/api/user');
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
  setToken(value:string){
    this.token = value;
  }
  getArticles(){
    return this.http.get('http://localhost:3000/api/articles');
  }
  getArticlesPerPage(offsetNum: number){
    return this.http.get('http://localhost:3000/api/articles?limit=5&offset='+offsetNum);
  }
  getTags(){
    return this.http.get('http://localhost:3000/api/tags');
  }
}
