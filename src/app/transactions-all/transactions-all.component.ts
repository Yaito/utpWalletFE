import { Component, OnInit, Host, HostListener } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { orderBy } from 'lodash';

import { Directive, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';

import { Transactions } from 'src/assets/models';
import { TransactionsService } from '../transactions.service';

@Component({
  selector: 'app-transactions-all',
  templateUrl: './transactions-all.component.html',
  styleUrls: ['./transactions-all.component.scss']
})
export class TransactionsAllComponent implements OnInit {
  content: Transactions[];
  original: Transactions[];

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
        this.content = res.transactions;
        this.contentSize = res['transactions'].length;
        this.original = Object.assign([], this.content);
        // console.log(this.original); // testing all transaction object
        // console.log(this.contentSize);
      });
    this.spinner.hide();
  }

  get transactions(): Transactions[] {
    return this.content
      .map((line, i) => ({ id: i + 1, ...line }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  onSort({ direction, field }) {
    if (direction === '') {
      this.content = this.original;
    } else {
      this.content = orderBy(this.content, [field], [direction]);
    }
  }

}
