import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../alert.service';
import { PayService } from '../pay.service';
import { ArduinoService } from '../arduino.service';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss']
})
export class PaymentModalComponent implements OnInit {

  paymentForm: FormGroup;
  submitted = false;
  cardID: number; // test it should be received from previous component
  // change id to be get from local api arduino
  // cardID = 4; // test

  constructor(
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private payService: PayService,
    private arduinoService: ArduinoService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.paymentForm = this.formBuilder.group({
      description: [null, Validators.required],
      amount: [null, [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]]
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
    // Get cardID from Arduino and Send Payment
    this.onPayment();
  }

  onSelected() {
    // storage the selected usertype for conditional fields
    console.log(this.paymentForm.value);
  }

  onPayment() {
    this.spinner.show();
    this.arduinoService.read()
      .subscribe(response => {
        this.cardID = response.user_ID;
        this.sendPay();
        this.spinner.hide();
      },
        error => {
          console.log(error);
          this.spinner.hide();
        }
      );
  }

  sendPay() {
    this.payService.pay(this.cardID, this.f.description.value, this.f.amount.value)
    .pipe(first())
    .subscribe(
      data => {
        this.spinner.hide();
        console.log(data);
        this.alertService.success(data.message);
        this.activeModal.close();
      },
      error => {
        this.spinner.hide();
        this.alertService.error(error);
        this.activeModal.close();
      });
  }
}
