import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_API } from 'src/app/common/baseApi';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  public userName:string | null = '';
  public limitNumber:number = 5;

  constructor(private http:HttpClient) { }

  public getMyArticles(pageNumber:number):Observable<any> {
    return this.http.get(`${BASE_API}/articles?author=${this.userName}&limit=${this.limitNumber}&offset=${pageNumber}`)
  }

  public getFavoritedArticles(pageNumber:number):Observable<any>{
    return this.http.get(`${BASE_API}/articles?favorited=${this.userName}&limit=${this.limitNumber}&offset=${pageNumber}`)
  }

  public likeArticle(slug:string | any):Observable<any> {
    return this.http.post(`${BASE_API}/articles/${slug}/favorite`,{})
  }

  public unlikeArticle(slug:string | any):Observable<any> {
    return this.http.delete(`${BASE_API}/articles/${slug}/favorite`)
  }

}
