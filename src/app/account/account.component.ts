import { Component, OnInit } from '@angular/core';
import { AccountDetail } from 'src/assets/models';
import { UserinfoService } from 'src/app/userinfo.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  initials: string;
  userProfile: AccountDetail;

  constructor(private userInfoServices: UserinfoService) {
  }

  ngOnInit() {
    this.userInfoServices.getInitials()
    .subscribe(res => {
      this.initials = res;
      // console.log(res);
    });

    this.userInfoServices.getUser()
    .subscribe(res => {
      this.userProfile = res;
      // console.log(res);
    });

    // this.userInfoServices.testGet()
    // .subscribe(res => {
    //   // this.userProfile = res;
    //   console.log(res);
    // });
  }



}
