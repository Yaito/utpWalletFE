import { Component, OnInit } from '@angular/core';
import { UserinfoService } from 'src/app/userinfo.service';

import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { LogUser } from 'src/assets/models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser: LogUser;

  constructor(
    private router: Router,
    private authenticationService: AuthService
) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
}

logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}

  ngOnInit() {

  }

}
