
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_API } from 'src/app/common/baseApi';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  public userName:string | null = '';
  constructor(private http:HttpClient) {

  }

  public getProfileUser(username:string | null):Observable<any> {
    return this.http.get(`${BASE_API}/profiles/${username}`)
  }

  public getCurrentUser():Observable<any>{
    return this.http.get(`${BASE_API}/user`)
  }

  public getMyArticles(pageNumber:number, limitNumber:number):Observable<any> {
    return this.http.get(`${BASE_API}/articles?author=${this.userName}&limit=${limitNumber}&offset=${pageNumber}`)
  }

  public getFavoritedArticles(pageNumber:number, limitNumber:number):Observable<any>{
    return this.http.get(`${BASE_API}/articles?favorited=${this.userName}&limit=${limitNumber}&offset=${pageNumber}
    `)
  }

  public followUser(userName:string):Observable<any> {
    return this.http.post(`${BASE_API}/profiles/${userName}/follow`,{})
  }

  public unFollowUser(userName:string):Observable<any> {
    return this.http.delete(`${BASE_API}/profiles/${userName}/follow`)
  }

  public likeArticle(slug:string | any):Observable<any> {
    return this.http.post(`${BASE_API}/articles/${slug}/favorite`,{})
  }

  public unlikeArticle(slug:string | any):Observable<any> {
    return this.http.delete(`${BASE_API}/articles/${slug}/favorite`)
  }
}
