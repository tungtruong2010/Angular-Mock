
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_API } from 'src/app/common/baseApi';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) {

  }

  public getProfileUser(username:string | null):Observable<any> {
    return this.http.get(`${BASE_API}/profiles/${username}`)
  }

  public getCurrentUser():Observable<any>{
    const headers = { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODdlNDA2MmU0MzA3ZmMyNmE3MDMyZCIsInVzZXJuYW1lIjoibmFtNDU2IiwiZXhwIjoxNjQxNDc5ODIzLCJpYXQiOjE2MzYyOTU4MjN9.85UtTcVml5B-ihVyYRixkjaQZClje5EwwrSUlOECcnQ'}
    return this.http.get(`${BASE_API}/user`,{headers} )
  }

  public getMyArticles(username:string | null):Observable<any> {
    return this.http.get(`${BASE_API}/articles?author=${username}&limit=10&offset=0`)
  }
}
