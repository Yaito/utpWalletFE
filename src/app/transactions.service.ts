import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';

import { Transactions, User, LogUser } from 'src/assets/models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  apiURL = 'https://utpwallet.herokuapp.com';
  userTransactions: Transactions[];
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

  // getData(): Observable<Transaction[]> { return of(this.transactions); }Î
  getData(cardID): Observable<User> {
    // return this.httpService.get<User>(`${this.apiURL}/students/${cardID}`);
    if (this.currentUser.user_type !== 0) {
      return this.httpService.get<User>(`${this.apiURL}/admins/${cardID}`);
    } else {
      return this.httpService.get<User>(`${this.apiURL}/students/${cardID}`);
    }

  }
}
