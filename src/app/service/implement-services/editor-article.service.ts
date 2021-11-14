import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { BehaviorSubject, ReplaySubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EditorArticleService {
  public editvalue=new BehaviorSubject('false');
  public deleteUpdated=new ReplaySubject();
  // public deleteUpdated: EventEmitter<any>;
  public token = localStorage.getItem('token');

  constructor(public http: HttpClient) {
    // this.deleteUpdated = new EventEmitter();
  }

  createArticle(title:string,maincontent:string,markdown:string, tagList:any){

    const body={
      "article": {
          "title": title,
          "description": maincontent,
          "body": markdown,
          "tagList": tagList,
      }
    }
    //console.log(this.token);

    return this.http.post('http://localhost:3000/api/articles',body)
  }
  deleteArticle(slug:string){
    console.log(slug);

    return this.http.delete('http://localhost:3000/api/articles/'+slug)
  }
  updateArticle(e:any){
    this.editvalue.next(e);
  }
  ChangeUpdateArticle(title:string,maincontent:string,markdown:string, tagList:any,slug:string){
    const body={
      "article": {
          "title": title,
          "description": maincontent,
          "body": markdown,
          "tagList": tagList,
      }
    }
    return this.http.put('http://localhost:3000/api/articles/'+slug,body)
  }
  getCmt(slug:any){
    return this.http.get(`http://localhost:3000/api/articles/${slug}/comments`)
  }
  postCmt(cmt:string,slug:string){
    const body={
       "comment": {
          "body": cmt
        }
    }
    return this.http.post(`http://localhost:3000/api/articles/${slug}/comments`,body)
  }
  deleteCmt(slug:any,id:any){
    return this.http.delete(`http://localhost:3000/api/articles/${slug}/comments/${id}`)
  }
  getArticle(slug:any){
    return this.http.get(`http://localhost:3000/api/articles/${slug}`);
  }
  follow(username:any){
    return this.http.post(`http://localhost:3000/api/profiles/${username}/follow`,{});
  }
  unfollow(username:any){
    return this.http.delete(`http://localhost:3000/api/profiles/${username}/follow`,{});
  }
  fav(slug:any){
    return this.http.post(`http://localhost:3000/api/articles/${slug}/favorite`,{});
  }
  unfav(slug:any){
    return this.http.delete(`http://localhost:3000/api/articles/${slug}/favorite`,{});
  }
}
