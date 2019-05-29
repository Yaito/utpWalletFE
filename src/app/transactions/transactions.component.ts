import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

import { TransactionsService } from '../transactions.service';
// import { UserinfoService } from 'src/app/userinfo.service';
import { AuthService } from '../auth.service';
import { Transactions, LogUser } from 'src/assets/models';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})

export class TransactionsComponent implements OnInit {
  currentUser: LogUser;
  currentUserSubscription: Subscription;

  content: Transactions[];

  constructor(
    private transactionService: TransactionsService,
    private authenticationService: AuthService,
    // private userInfoServices: UserinfoService,
    private spinner: NgxSpinnerService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.spinner.show();
    this.transactionService.getData(this.currentUser.user_ID) // 
      .subscribe(res => {
        this.content = res.transactions;
        console.log(this.content); // testing transaction object
        this.spinner.hide();
      });

  }
}
