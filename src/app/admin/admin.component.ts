import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { Chart } from 'node_modules/chart.js';

import { TransactionsService } from '../transactions.service';
import { RegisterComponent } from '../register/register.component';
import { Transactions, Career, Faculty, RoleType } from 'src/assets/models';
import { RegisterService } from '../register.service';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  content: Transactions;
  chart = [];

  analytic = false;
  uniFaculties: Faculty;
  uniCareers: Career;
  uniUsers: RoleType;

  constructor(
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private transactionService: TransactionsService,
    private registerService: RegisterService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.transactionService.getAllTransactions()
      .subscribe(res => {
        this.content = res;
        console.log(this.content); // testing all transaction object
        //////////////////////////////////////////////////////////////
        let money = res['transactions'].map(res => res.amount);
        let allDates = res['transactions'].map(res => res.date);
        console.log(money);
        // console.log(allDates);

        const parsedDates = [];
        allDates.forEach((res) => {
          const jsdate = new Date(res);
          parsedDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }))
        });
        console.log(parsedDates);
        // this.genCharts(parsedDates, money);
        // let ctx = document.getElementById('myChart');
        // this.chart = new Chart(ctx, {
        //   type: 'line',
        //   data: {
        //     labels: parsedDates,
        //     datasets: [
        //       {
        //         data: money,
        //         borderColor: '#3cba9f',
        //         fill: false
        //       }
        //     ]
        //   },
        //   options: {
        //     legend: {
        //       display: false
        //     },
        //     scales: {
        //       xAxes: [{
        //         display: true
        //       }],
        //       yAxes: [{
        //         display: true
        //       }]
        //     }
        //   }
        // });

      });
    this.spinner.hide();
  }

  registerModal() {
    this.spinner.show();
    // getting university data such as career and faculty
    this.registerService.getPlan()
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          this.uniUsers = data.user_type;
          this.uniFaculties = data.faculties;
          this.uniCareers = data.careers;
          // opening modal and passing university data to modal
          const modalRef = this.modalService.open(RegisterComponent, { size: 'lg' });
          // passing data through the modal
          modalRef.componentInstance.faculties = this.uniFaculties;
          modalRef.componentInstance.careers = this.uniCareers;
          modalRef.componentInstance.roleTypes = this.uniUsers;
          // console.log(this.uniFaculties);
          // console.log(this.uniCareers);
          this.spinner.hide();
        },
        error => {
          this.alertService.error(error);
          this.spinner.hide();
        });
  }

  onAnalytic() {
    this.analytic = !this.analytic;
    console.log(this.analytic);
  }

  genCharts(dates, amount) {
    let ctx = document.getElementById('myChart');
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [
          {
            data: amount,
            borderColor: '#3cba9f',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }]
        }
      }
    });
  }

}
