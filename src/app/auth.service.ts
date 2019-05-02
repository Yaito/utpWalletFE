import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient) { }

  getUserDetails(username, password) {
    // post user login details to API server, return user info if correct
    return this.http.post('/api/auth', {
      username,
      password
    }).subscribe(data => {
      console.log(data, 'what the API returned')
    })
  }
}
