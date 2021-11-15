
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_API } from 'src/app/common/baseApi';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http:HttpClient) { }

  public getProfileUser(username:string | null):Observable<any> {
    return this.http.get(`${BASE_API}/profiles/${username}`)
  }

  public getCurrentUser():Observable<any>{
    return this.http.get(`${BASE_API}/user`)
  }

  public followUser(userName:string):Observable<any> {
    return this.http.post(`${BASE_API}/profiles/${userName}/follow`,{})
  }

  public unFollowUser(userName:string):Observable<any> {
    return this.http.delete(`${BASE_API}/profiles/${userName}/follow`)
  }
}
