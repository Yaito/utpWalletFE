import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/assets/models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {
  apiURL = 'https://utpwallet.herokuapp.com';

  constructor(private httpService: HttpClient) { }

  getInitials(firstName, lastName) {
    const initials = firstName[0] + lastName[0];
    // console.log(initials);
    return of(initials);
  }

  getUser(cardID): Observable<User> {
    return this.httpService.get<User>(`${this.apiURL}/students/${cardID}`);
  }

}
