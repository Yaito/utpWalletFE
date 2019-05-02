import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logo = 'assets/Logo.png';

  username;
  password;

  constructor(private Auth: AuthService) { }

  ngOnInit() {
  }

  loginUser() {
    event.preventDefault();
    this.Auth.getUserDetails(this.username, this.password);
    console.log(this.username, this.password);
  }

}
