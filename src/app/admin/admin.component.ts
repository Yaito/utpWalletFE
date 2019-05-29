import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TransactionsService } from '../transactions.service';
import { RegisterComponent } from '../register/register.component';
import { Transactions } from 'src/assets/models';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  content: Transactions;
  analytic = false;

  constructor(
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private transactionService: TransactionsService,
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.transactionService.getAllTransactions()
      .subscribe(res => {
        this.content = res;
        // console.log(this.content); // testing all transaction object
        this.spinner.hide();
      });
  }

  registerModal() {
    this.spinner.show();
    const modalRef = this.modalService.open(RegisterComponent, { size: 'lg' });
    this.spinner.hide();
  }

  onAnalytic() {
    if (!this.analytic) {
      this.analytic = true;
    } else {
      this.analytic = false;
    }
    console.log(this.analytic);
  }
}
