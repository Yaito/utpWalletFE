import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

import { User } from 'src/assets/models';
import { UserinfoService } from 'src/app/userinfo.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-security-result',
  templateUrl: './security-result.component.html',
  styleUrls: ['./security-result.component.scss']
})
export class SecurityResultComponent implements OnInit {
  userProfile: User;
  initials: string;
  cardID: number; // this value is received from the parent component which activate this modal

  constructor(
    public activeModal: NgbActiveModal,
    private userInfoServices: UserinfoService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.userInfoServices.showUser(this.cardID)
      .subscribe(res => {
        this.userProfile = res;

        this.userInfoServices.getInitials(this.userProfile.first_name, this.userProfile.last_name)
          .subscribe(resIni => {
            this.initials = resIni;
            console.log(resIni);
          });
        // console.log(res);
        // console.log(JSON.stringify(res));
        // console.log(this.userProfile);
      },
      error => {
        this.spinner.hide();
        this.alertService.error(error);
      });
    this.spinner.hide();
  }


}
