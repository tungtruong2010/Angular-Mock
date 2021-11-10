
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
    const tokenByUser = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODg5YzFhNTc5YjQ3NGMwNzY0MzY0ZSIsInVzZXJuYW1lIjoibmFtNzg5IiwiZXhwIjoxNjQxNjM1NDk2LCJpYXQiOjE2MzY0NTE0OTZ9.cDQqRecVQDX8Ba_VCDJn4wT_0i9kqZkUKdjG8AfFHcY'
    const headers = { 'Authorization': `Bearer ${tokenByUser}`}
    return this.http.get(`${BASE_API}/user`,{headers} )
  }

  public getMyArticles(pageNumber:number, limitNumber:number):Observable<any> {
    return this.http.get(`${BASE_API}/articles?author=${this.userName}&limit=${limitNumber}&offset=${pageNumber}`)
  }

  public getFavoritedArticles(pageNumber:number, limitNumber:number):Observable<any>{
    return this.http.get(`${BASE_API}/articles?favorited=${this.userName}&limit=${limitNumber}&offset=${pageNumber}
    `)
  }

  public followUser(userName:string):Observable<any> {
    const tokenByUser = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODg5YzFhNTc5YjQ3NGMwNzY0MzY0ZSIsInVzZXJuYW1lIjoibmFtNzg5IiwiZXhwIjoxNjQxNjM1NDk2LCJpYXQiOjE2MzY0NTE0OTZ9.cDQqRecVQDX8Ba_VCDJn4wT_0i9kqZkUKdjG8AfFHcY'
    const headers = { 'Authorization': `Bearer ${tokenByUser}`}
    return this.http.post(`${BASE_API}/profiles/${userName}/follow`,{}, {headers})
  }

  public unFollowUser(userName:string):Observable<any> {
    const tokenByUser = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODg5YzFhNTc5YjQ3NGMwNzY0MzY0ZSIsInVzZXJuYW1lIjoibmFtNzg5IiwiZXhwIjoxNjQxNjM1NDk2LCJpYXQiOjE2MzY0NTE0OTZ9.cDQqRecVQDX8Ba_VCDJn4wT_0i9kqZkUKdjG8AfFHcY'
    const headers = { 'Authorization': `Bearer ${tokenByUser}`}
    return this.http.delete(`${BASE_API}/profiles/${userName}/follow`,{headers})
  }

  public likeArticle(slug:string | any):Observable<any> {
    const tokenByUser = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODg5YzFhNTc5YjQ3NGMwNzY0MzY0ZSIsInVzZXJuYW1lIjoibmFtNzg5IiwiZXhwIjoxNjQxNjM1NDk2LCJpYXQiOjE2MzY0NTE0OTZ9.cDQqRecVQDX8Ba_VCDJn4wT_0i9kqZkUKdjG8AfFHcY'
    const headers = { 'Authorization': `Bearer ${tokenByUser}`}
    return this.http.post(`${BASE_API}/articles/${slug}/favorite`,{}, {headers})
  }

  public unlikeArticle(slug:string | any):Observable<any> {
    const tokenByUser = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODg5YzFhNTc5YjQ3NGMwNzY0MzY0ZSIsInVzZXJuYW1lIjoibmFtNzg5IiwiZXhwIjoxNjQxNjM1NDk2LCJpYXQiOjE2MzY0NTE0OTZ9.cDQqRecVQDX8Ba_VCDJn4wT_0i9kqZkUKdjG8AfFHcY'
    const headers = { 'Authorization': `Bearer ${tokenByUser}`}
    return this.http.delete(`${BASE_API}/articles/${slug}/favorite`, {headers})
  }
}
