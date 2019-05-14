import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../transactions.service';
import { Transaction } from 'src/assets/models';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})

export class TransactionsComponent implements OnInit {

content: Transaction[];

constructor(private transactionService: TransactionsService) { }

  ngOnInit() {
    this.transactionService.getData()
      .subscribe(res => {
        this.content = res;
        // console.log(res);
      });
  }


}
