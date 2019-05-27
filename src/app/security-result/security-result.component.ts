import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

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

  @Input() cardID: number; // this value is received from the parent component which activate this modal
  @Input() userType: number; // this value is received from the parent compenent which activate this modal

  constructor(
    public activeModal: NgbActiveModal,
    private userInfoServices: UserinfoService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.userInfoServices.showUser(this.cardID, this.userType)
      .subscribe(res => {
        this.userProfile = res;

        this.userInfoServices.getInitials(this.userProfile.first_name, this.userProfile.last_name)
          .subscribe(resIni => {
            this.initials = resIni;
            // console.log(resIni);
          });
        // console.log(res);
        // console.log(JSON.stringify(res));
        console.log(this.userProfile);
      });
  }


}
