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

  getData(cardID): Observable<User> {
    // for getting account own transactions data
    return this.httpService.get<User>(`${this.apiURL}/users/${cardID}`);

  }

  getAllTransactions():Observable<Transactions[]> {
    // get all transactions data in the database
    return this.httpService.get<Transactions[]>(`${this.apiURL}/transactions`);
  }
}
