import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {
  chart = [];

  constructor(
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    //////////////////////////////////////////////////////////////
    // let money = res['transactions'].map(res => res.amount);
    // let allDates = res['transactions'].map(res => res.date);
    // console.log(money);
    // // console.log(allDates);

    // const parsedDates = [];
    // allDates.forEach((res) => {
    //   const jsdate = new Date(res);
    //   parsedDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }))
    // });
    // console.log(parsedDates);
    // this.genCharts(parsedDates, money);
    //////////////////////////////////////////////////////////////
    this.spinner.hide();
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
