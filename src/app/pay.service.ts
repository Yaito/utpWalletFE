import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayService {
  apiURL = 'https://utpwallet.herokuapp.com';

  constructor(private httpService: HttpClient) { }

  pay(
    user_ID: number,
    description: string,
    amount: number
    ) {
    // for registering a user
    return this.httpService.put<any>(`${this.apiURL}/pay`,
    { user_ID, amount, description });
  }


}
