import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtDTO } from '../dto/jwt-dto';
import { LoginUser } from '../model/login-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = environment.authUrl;

  constructor(private httpClient: HttpClient) { }

  public login(loginUser: LoginUser): Observable<JwtDTO>{
    return this.httpClient.post<JwtDTO>(this.authURL + "login", loginUser);
  }

  public refresh(dto: JwtDTO): Observable<JwtDTO>{
    return this.httpClient.post<JwtDTO>(this.authURL+'refresh', dto);
  }
}
