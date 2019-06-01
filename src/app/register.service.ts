import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Subscription } from 'rxjs';

import { LogUser, University } from 'src/assets/models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
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

  registerUser(
    username: string,
    password: string,
    usertype: number
    ) {
    // for registering a user
    return this.httpService.post<any>(`${this.apiURL}/register`,
    { username, password, usertype });
  }

  registerAccount(
    user_ID: number,
    first_name: string,
    last_name: string,
    personal_ID: string,
    acc_fac: string,
    acc_career: string,
    user_type: number,
  ) {
    return this.httpService.post<any>(`${this.apiURL}/users/${user_ID}`,
    { user_ID, first_name, last_name, user_type, personal_ID, acc_fac, acc_career });

  }

  getPlan(): Observable<University> {
    // get all faculty, careers and user type available
    return this.httpService.get<University>(`${this.apiURL}/university`);
  }

}
