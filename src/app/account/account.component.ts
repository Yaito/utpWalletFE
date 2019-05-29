import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

import { LogUser, User } from 'src/assets/models';
import { UserinfoService } from 'src/app/userinfo.service';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {
  currentUser: LogUser;
  currentUserSubscription: Subscription;

  initials: string;
  userProfile: User;

  constructor(
    private userInfoServices: UserinfoService,
    private authenticationService: AuthService,
    private spinner: NgxSpinnerService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });

  }

  ngOnInit() {
    this.spinner.show();
    this.userInfoServices.getUser(this.currentUser.user_ID)
      .subscribe(res => {
        this.userProfile = res;

        this.userInfoServices.getInitials(this.userProfile.first_name, this.userProfile.last_name)
          .subscribe(resIni => {
            this.initials = resIni;
            // console.log(resIni); // testing initial purpose
          });
        this.spinner.hide();
        // console.log(res); // testing account details returned object
        // console.log(JSON.stringify(res));
        // console.log(typeof (this.userProfile));
      });

  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

}
