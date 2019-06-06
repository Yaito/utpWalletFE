import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../alert.service';
import { PayService } from '../pay.service';
@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss']
})
export class PaymentModalComponent implements OnInit {

  paymentForm: FormGroup;
  submitted = false;

  // change id to be get from local api arduino
  cardID = 4; // test

  constructor(
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private payService: PayService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.paymentForm = this.formBuilder.group({
      description: [null, Validators.required],
      amount: [null, [Validators.required, Validators.pattern(/^\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$/)]]
    });
    this.spinner.hide();
  }

  get f() { return this.paymentForm.controls; }

  onSubmit() {
    this.spinner.show();
    this.submitted = true;

    // stop here if form is invalid
    if (this.paymentForm.invalid) {
      this.spinner.hide();
      return;
    }
    // here goes the payment services
    this.payService.pay(this.cardID, this.f.description.value, this.f.amount.value)
      .pipe(first())
      .subscribe(
        data => {
          this.spinner.hide();
          console.log(data);
          this.alertService.success(data.message);
        },
        error => {
          this.spinner.hide();
          this.alertService.error(error);
        });
    this.spinner.hide();
  }

  onSelected() {
    // storage the selected usertype for conditional fields
    console.log(this.paymentForm.value);
  }

}
