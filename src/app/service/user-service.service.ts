import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private _postURL = environment.postUrl;

  constructor(private httpClient: HttpClient) { }

  getUser(): Observable<User>{
    return this.httpClient.post<User>(this._postURL + 'user', null);
  }

  getUserById(id: number): Observable<User>{
    return this.httpClient.post<User>(this._postURL + `user/${id}`, null);
  }

  followUser(id: number): Observable<any>{
    return this.httpClient.post<any>(this._postURL + `follow/${id}`, null);
  }

  unFollowUser(id: number): Observable<any>{
    console.log("DENTRO DEL UNFOLLOW   id: " + id);
    return this.httpClient.post<any>(this._postURL + `unFollow/${id}`, null);
  }

  verFollowUser(id: number): Observable<boolean>{
    return this.httpClient.post<boolean>(this._postURL + `verFollow/${id}`, null);
  }
}
