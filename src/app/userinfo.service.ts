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
    // for getting account initials
    const initials = firstName[0] + lastName[0];
    // console.log(initials);
    return of(initials);
  }

  getUser(cardID): Observable<User> {
    // for getting account own data and information
    return this.httpService.get<User>(`${this.apiURL}/users/${cardID}`);
  }

  showUser(cardID): Observable<User> {
    // for security feature to get others account information
    return this.httpService.get<User>(`${this.apiURL}/security`, { params: { user_ID: cardID } });
  }

  rechargeInfo(cardID): Observable<User> {
    return this.httpService.get<User>(`${this.apiURL}/recharge`, { params: { user_ID: cardID } });
  }
}
