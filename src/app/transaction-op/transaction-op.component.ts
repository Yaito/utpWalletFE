import { Component, OnInit, Input } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { RechargeModalComponent } from '../recharge-modal/recharge-modal.component';
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';
import { ArduinoService } from '../arduino.service';
@Component({
  selector: 'app-transaction-op',
  templateUrl: './transaction-op.component.html',
  styleUrls: ['./transaction-op.component.scss']
})
export class TransactionOpComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService,
    private modalService: NgbModal,
    private arduinoService: ArduinoService
  ) { }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 200);
  }

  rechargeModal() {
    this.spinner.show();
    this.arduinoService.read()
      .subscribe(response => {
        console.log(response);
        const aux = response.user_ID;
        const modalRef = this.modalService.open(RechargeModalComponent, { size: 'lg' });
        modalRef.componentInstance.cardID = aux; //  send CardID to next component
        this.spinner.hide();
      },
        error => {
          console.log(error);
          this.spinner.hide();
        }
      );
  }

  paymentModal() {
    this.spinner.show();
    const modalRef = this.modalService.open(PaymentModalComponent, { size: 'lg' });
    this.spinner.hide();
  }

}
