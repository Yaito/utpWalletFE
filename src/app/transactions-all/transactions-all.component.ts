import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { Transactions } from 'src/assets/models';
import { TransactionsService } from '../transactions.service';

@Component({
  selector: 'app-transactions-all',
  templateUrl: './transactions-all.component.html',
  styleUrls: ['./transactions-all.component.scss']
})
export class TransactionsAllComponent implements OnInit {
  content: Transactions[];

  constructor(
    private transactionService: TransactionsService,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit() {
    this.spinner.show();
    this.transactionService.getAllTransactions()
      .subscribe(res => {
        this.content = res;
        console.log('content=', this.content); // testing all transaction object
      });
    this.spinner.hide();
  }

}
