import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LogUser } from '../assets/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<LogUser>;
  public currentUser: Observable<LogUser>;
  apiUrl = 'https://utpwallet.herokuapp.com';

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<LogUser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): LogUser {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.access_token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        console.log(user);  // testing and confirmation purpose
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }



  // getUserDetails(username, password) {
  //   // post user login details to API server, return user info if correct
  //   return this.http.post('/api/auth', {
  //     username,
  //     password
  //   }).subscribe(data => {
  //     console.log(data, 'what the API returned');
  //   });
  // }
}
