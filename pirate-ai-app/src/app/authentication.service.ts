import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { BackEndRoutesService } from './back-end-routes.service';
import { User } from './_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User|null>;
  public currentUser: Observable<User|null|string>;

  constructor(private BEservice:BackEndRoutesService) {
    this.currentUserSubject = new BehaviorSubject<User|null>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }


  login(username: string, password: string) {
    return this.BEservice.postMethod(`cred/login`, { username, password })
        .subscribe((res:any) => {

          if (res && res.token) {
            localStorage.setItem('currentUser', JSON.stringify(res));
            this.currentUserSubject.next(res);
          }

          return res;

        });
  }
  logout() {
    // remove user from local storage to log user out
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');

}
}
