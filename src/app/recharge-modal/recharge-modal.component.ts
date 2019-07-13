import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../alert.service';
import { RechargeService } from '../recharge.service';
import { UserinfoService } from '../userinfo.service';
import {SnotifyService} from 'ng-snotify';
import { User } from 'src/assets/models';
@Component({
  selector: 'app-recharge-modal',
  templateUrl: './recharge-modal.component.html',
  styleUrls: ['./recharge-modal.component.scss']
})
export class RechargeModalComponent implements OnInit {
  rechargeForm: FormGroup;
  submitted = false;
  userProfile: User;
  initials;

  cardID: number; // test it should be received from previous component

  constructor(
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private rechargeService: RechargeService,
    private userInfoServices: UserinfoService,
    private snotifyService: SnotifyService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.userInfoServices.rechargeInfo(this.cardID)
      .subscribe(res => {
        this.userProfile = res;
        console.log(this.userProfile);

        this.userInfoServices.getInitials(this.userProfile.first_name, this.userProfile.last_name)
          .subscribe(resIni => {
            this.initials = resIni;
            console.log(this.initials);
          });
        // console.log(res);
        // console.log(JSON.stringify(res));
        // console.log(this.userProfile);
      });

    this.rechargeForm = this.formBuilder.group({
      description: [null, Validators.required],
      amount: [null, [Validators.required, Validators.pattern(/^\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$/)]]
    });
    this.spinner.hide();
  }

  get f() { return this.rechargeForm.controls; }

  onSubmit() {
    this.spinner.show();
    this.submitted = true;

    // stop here if form is invalid
    if (this.rechargeForm.invalid) {
      this.spinner.hide();
      return;
    }
    // here goes the recharge services
    this.rechargeService.recharge(this.cardID, this.f.description.value, this.f.amount.value)
      .pipe(first())
      .subscribe(
        data => {
          this.spinner.hide();
          console.log(data);
          // this.alertService.success(data.message);
          this.snotifyService.success(data.message + ' Se ha agregado $' + this.f.amount.value + ' a la cuenta.', 'Recarga Exitosa', {
            timeout: 5000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            position: 'rightTop',
            icon: '/assets/Logo_RAW.png'
          });
          this.activeModal.close();
        },
        error => {
          this.spinner.hide();
          // this.alertService.error(error);
          this.snotifyService.error(error, 'Error', {
            timeout: 5000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            position: 'rightTop',
            icon: '/assets/Logo_RAW.png'
          });
          this.activeModal.close();
        });
    this.spinner.hide();
  }

  onSelected() {
    // storage the selected usertype for conditional fields
    console.log(this.rechargeForm.value);
  }

}
