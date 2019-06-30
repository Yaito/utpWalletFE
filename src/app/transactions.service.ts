import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

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

  getAllTransactions(): Observable<any> {
    // get all transactions data in the database
    return this.httpService.get<any>(`${this.apiURL}/transactions`);
  }

  singleDay(day, month, year) {
    // sum transactions from a day
    return this.httpService.get(`${this.apiURL}/transactions/day`, { params: { day, month, year } })
    .pipe(map(result => result));
  }

  singleMonth(month, year): Observable<any> {
    // sum transactions from a month
    return this.httpService.get<any>(`${this.apiURL}/transactions/month`, { params: { month, year } })
    .pipe(map(result => result));
  }

  singleYear(year): Observable<any> {
    // sum transactions from a year
    return this.httpService.get<any>(`${this.apiURL}/transactions/year`, { params: { year } })
    .pipe(map(result => result));
  }

  daysperMonth(month, year): Observable<any> {
    // every single day sum transactions from a month
    return this.httpService.get<any>(`${this.apiURL}/transactions/month/day`, { params: { month, year } })
    .pipe(map(result => result));
  }

  monthsperYear(year): Observable<any> {
    // every months sum transactions from a year
    return this.httpService.get<any>(`${this.apiURL}/transactions/year/month`, { params: { year } })
    .pipe(map(result => result));
  }

  betweenYears(initial_year, final_year): Observable<any> {
    // sum transactions between years
    return this.httpService.get<any>(`${this.apiURL}/transactions/year/many_year`, { params: { initial_year, final_year } })
    .pipe(map(result => result));
  }

}
