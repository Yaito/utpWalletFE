import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Transaction } from 'src/assets/models';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  transactions: Transaction[] =
    [
      {
        id: 135790,
        user: '8-892-1234',
        type: 'RCH',
        date: new Date('2018-05-03T11:20:10'),
        debit: 100.00,
        credit: 0.00
      },
      {
        id: 135791,
        user: '8-456-1020',
        type: 'PAY',
        date: new Date('2018-05-02T12:20:15'),
        debit: 0.00,
        credit: 50.00
      }
    ];

  constructor(private httpService: HttpClient) { }

  getData(): Observable<Transaction[]> { return of(this.transactions); }
}
