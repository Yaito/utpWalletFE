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
  content: Transactions;

  page = 1;
  pageSize = 10;
  contentSize;

  constructor(
    private transactionService: TransactionsService,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit() {
    this.spinner.show();
    this.transactionService.getAllTransactions()
      .subscribe(res => {
        this.content = res;
        this.contentSize = res['transactions'].length;
        console.log(this.content); // testing all transaction object
        console.log(this.contentSize);
      });
    this.spinner.hide();
  }

  get transactions(): Transactions[] {
    return this.content['transactions']
      .map((line, i) => ({id: i + 1, ...line}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

}
