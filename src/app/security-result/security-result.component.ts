import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/assets/models';
import { UserinfoService } from 'src/app/userinfo.service';



@Component({
  selector: 'app-security-result',
  templateUrl: './security-result.component.html',
  styleUrls: ['./security-result.component.scss']
})
export class SecurityResultComponent implements OnInit {

  userProfile: User;
  initials: string;
  cardID = 10;

  ngOnInit() {
    this.userInfoServices.getUser(this.cardID)
    .subscribe(res => {
      this.userProfile = res;

      this.userInfoServices.getInitials(this.userProfile.first_name, this.userProfile.last_name)
      .subscribe(resIni => {
        this.initials = resIni;
        // console.log(resIni);
      });

      console.log(res);
      // console.log(JSON.stringify(res));
      // console.log(typeof (this.userProfile));
    });
  }

  constructor(public activeModal: NgbActiveModal, private userInfoServices: UserinfoService) { }


}
