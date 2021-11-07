import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { ReplaySubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EditorArticleService {
  public editvalue=new ReplaySubject();
  constructor(public http: HttpClient) { }
  
  createArticle(title:string,maincontent:string,markdown:string, tagList:any){
    
    const headers = { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODJhZjVhYWFlZGZmNDg3MDEzNGRlMCIsInVzZXJuYW1lIjoiamFjb2IiLCJleHAiOjE2NDEzMTcyNTIsImlhdCI6MTYzNjEzMzI1Mn0.rw9SxZQwkbfbVT4TuFDM3nyztRphHUlviqnSI4kwUWk', 'My-Custom-Header': 'foobar' };
    const body={
      "article": {
          "title": title,
          "description": maincontent,
          "body": markdown,
          "tagList": tagList,
      }
    }
    return this.http.post('http://localhost:3000/api/articles',body,{headers})
  }
  deleteArticle(slug:string){
    const headers = { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODJhZjVhYWFlZGZmNDg3MDEzNGRlMCIsInVzZXJuYW1lIjoiamFjb2IiLCJleHAiOjE2NDEzMTcyNTIsImlhdCI6MTYzNjEzMzI1Mn0.rw9SxZQwkbfbVT4TuFDM3nyztRphHUlviqnSI4kwUWk', 'My-Custom-Header': 'foobar' };
    return this.http.delete('http://localhost:3000/api/articles/'+slug,{headers})
  }
  updateArticle(e:any){
    this.editvalue.next(e);
  }
  ChangeUpdateArticle(title:string,maincontent:string,markdown:string, tagList:any,slug:string){
    const headers = { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODJhZjVhYWFlZGZmNDg3MDEzNGRlMCIsInVzZXJuYW1lIjoiamFjb2IiLCJleHAiOjE2NDEzMTcyNTIsImlhdCI6MTYzNjEzMzI1Mn0.rw9SxZQwkbfbVT4TuFDM3nyztRphHUlviqnSI4kwUWk', 'My-Custom-Header': 'foobar' };
    const body={
      "article": {
          "title": title,
          "description": maincontent,
          "body": markdown,
          "tagList": tagList,
      }
    }
    return this.http.put('http://localhost:3000/api/articles/'+slug,body,{headers})
  }
  getCmt(slug:any){
    return this.http.get(`http://localhost:3000/api/articles/${slug}/comments`)
  }
  postCmt(cmt:string,slug:string){
    const headers = { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODJhZjVhYWFlZGZmNDg3MDEzNGRlMCIsInVzZXJuYW1lIjoiamFjb2IiLCJleHAiOjE2NDEzMTcyNTIsImlhdCI6MTYzNjEzMzI1Mn0.rw9SxZQwkbfbVT4TuFDM3nyztRphHUlviqnSI4kwUWk', 'My-Custom-Header': 'foobar' };
    const body={
       "comment": {
          "body": cmt
        }
    }
    return this.http.post(`http://localhost:3000/api/articles/${slug}/comments`,body,{headers})
  }
  getArticle(slug:any){
    return this.http.get(`http://localhost:3000/api/articles/${slug}`);
  }
  
}
