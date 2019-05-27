import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Subscription } from 'rxjs';

import { User, LogUser } from 'src/assets/models';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class UserinfoService {
  apiURL = 'https://utpwallet.herokuapp.com';
  currentUser: LogUser;
  currentUserSubscription: Subscription;

  constructor(
    private httpService: HttpClient,
    private authenticationService: AuthService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });

  }

  getInitials(firstName, lastName) {
    const initials = firstName[0] + lastName[0];
    // console.log(initials);
    return of(initials);
  }

  getUser(cardID): Observable<User> {
    // for getting account own data and information
      if (this.currentUser.user_type !== 0) {
        return this.httpService.get<User>(`${this.apiURL}/admins/${cardID}`);
      } else {
        return this.httpService.get<User>(`${this.apiURL}/students/${cardID}`);
      }
  }

  showUser(cardID, type): Observable<User> {
    // for getting others account informacion
    if (type > 0) {
      return this.httpService.get<User>(`${this.apiURL}/admins/${cardID}`);
    } else {
      return this.httpService.get<User>(`${this.apiURL}/students/${cardID}`);
    }
  }

}
