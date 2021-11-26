import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BackEndRoutesService {


  baseUrl: string = "http://localhost:3000/api/";
  constructor(private http: HttpClient) { }

  getMethod(url: string){
    return this.http.get(this.baseUrl + url);
  }

  postMethod(url:string, body:object){
    return this.http.post(this.baseUrl + url, body);
  }
}
