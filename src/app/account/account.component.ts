import { Component, OnInit } from '@angular/core';
import { User } from 'src/assets/models';
import { UserinfoService } from 'src/app/userinfo.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  initials: string;
  userProfile: User;

  constructor(private userInfoServices: UserinfoService) {
  }

  ngOnInit() {
    this.userInfoServices.getUser()
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

}
