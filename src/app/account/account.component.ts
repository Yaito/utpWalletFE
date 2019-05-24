import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LogUser } from 'src/assets/models';
import { User } from 'src/assets/models';
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
  cardID = 5;

  constructor(
    private userInfoServices: UserinfoService,
    private authenticationService: AuthService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });

  }

  ngOnInit() {
    this.userInfoServices.getUser(this.currentUser.user_ID) // change param to LogUser ID
      .subscribe(res => {
        this.userProfile = res;

        this.userInfoServices.getInitials(this.userProfile.first_name, this.userProfile.last_name)
          .subscribe(resIni => {
            this.initials = resIni;
            console.log(resIni);
          });

        console.log(res);
        console.log(JSON.stringify(res));
        console.log(typeof (this.userProfile));
      });

    // this.userInfoServices.getInitials(this.userProfile.first_name, this.userProfile.last_name)
    //   .subscribe(resIni => {
    //     this.initials = resIni;
    //     console.log(resIni);
    //   });

  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

}
