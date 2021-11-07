
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

  public getProfileUser(username:string):Observable<any> {
    return this.http.get(`${BASE_API}/profiles/${username}`)
  }
}
