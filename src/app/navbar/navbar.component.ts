import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

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
  currentUserSubscription: Subscription;

  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {

  }

}
