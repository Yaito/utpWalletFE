import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AccountDetail } from 'src/assets/models';

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {
  user: AccountDetail =
    {
      accountID: 123456789100,
      fname: 'Luis',
      lname: 'Yao',
      personalID: '8-898-6969',
      faculty: 'Facultad de Ingeniería de Sistemas Computacionales',
      career: 'Licenciatura en Ingeniería de Sistemas y Computación',
      balance: 420.69
    };

  constructor(private httpService: HttpClient) { }

  getUser(): Observable<AccountDetail> { return of(this.user); }

  getInitials() {
    const initials = this.user.fname[0] + this.user.lname[0];
    return of(initials);
  }

  // testGet() {
  //   return this.httpService.get('https://utpwallet.herokuapp.com/students/1')
  //     .subscribe(data => {
  //       console.log(data, 'what the API returned');
  //     });
  // }

}
