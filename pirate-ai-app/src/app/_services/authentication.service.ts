import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { BackEndRoutesService } from './back-end-routes.service';
import { User } from '../_models/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl: string = "http://localhost:3000/api/";
  constructor(private http: HttpClient) {

  }

  login(username:string, password:string): Observable<any> {
    return this.http.post(this.baseUrl+"cred/login", {username, password}, httpOptions)
  };

  register(first_name:string, last_name:string, username:string, email:string, password:string): Observable<any> {
    return this.http.post(this.baseUrl+"cred/register", {first_name, last_name, username, email, password}, httpOptions)
  }

}
