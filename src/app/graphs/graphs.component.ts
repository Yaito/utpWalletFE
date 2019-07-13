import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { NgxSpinnerService } from 'ngx-spinner';
import { TransactionsService } from '../transactions.service';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {
  date = new Date();

  singledaychart: [];
  chart1 = false;

  daychart;
  chart2 = false;

  monthschart;
  chart3 = false;

  yearschart;
  chart4 = false;

  // line chart
  @Input() month = this.date.getMonth() + 1;
  @Input() monthYear = this.date.getFullYear();
  // bar chart 1
  @Input() year = this.date.getFullYear();
  // bar chart 2
  @Input() final_year = this.date.getFullYear();
  @Input() initial_year = this.final_year - 1;
  // pie chart
  @Input() sDay = this.date.getDate();
  @Input() sMonth = this.date.getMonth() + 1;
  @Input() sYear = this.date.getFullYear();

  constructor(
    private spinner: NgxSpinnerService,
    private transactionService: TransactionsService
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.spinner.hide();
  }

  onCharts(chart) {
    switch (chart) {
      case 1: {
        if (!this.chart1) {
          this.dayCharts();
        }
        this.chart1 = !this.chart1;
        break;
      }
      case 2: {
        if (!this.chart2) {
          this.dayspermonthCharts();
        }
        this.chart2 = !this.chart2;
        break;
      }
      case 3: {
        if (!this.chart3) {
          this.monthsperyearCharts();
        }
        this.chart3 = !this.chart3;
        break;
      }
      case 4: {
        if (!this.chart4) {
          this.yearsCharts();
        }
        this.chart4 = !this.chart4;
        break;
      }
      default: {
        //statements; 
        break;
      }
    }
  }

  dayspermonthCharts() {
    if (this.daychart != null) {
      this.daychart.destroy();
  }

    this.spinner.show();
    this.transactionService.daysperMonth(this.month, this.monthYear)
      .subscribe(res => {
        // console.log(res);

        let rchAmount = res['daily_transactions'].map(res => res.Recharge);
        let payAmount = res['daily_transactions'].map(res => res.Payment);
        let days = res['daily_transactions'].map(res => res.day);

        let ctx = document.getElementById('daysChart');
        this.daychart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: days,
            datasets: [
              {
                label: 'Total de Recarga',
                data: rchAmount,
                borderColor: '#7EC0EE',
                backgroundColor: '#7EC0EE',
                fill: false
              },
              {
                label: 'Total de Cobro',
                data: payAmount,
                borderColor: '#FFC0CB',
                backgroundColor: '#FFC0CB',
                fill: false
              }
            ]
          },
          options: {
            legend: {
              display: true
            },
            scales: {
              xAxes: [{
                // display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Días del Mes'
                }
              }],
              yAxes: [{
                // display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Monto ($)'
                }
              }]
            },
            responsive: false
          }
        });
      });
    this.spinner.hide();
  }

  monthsperyearCharts() {
    if (this.monthschart != null) {
      this.monthschart.destroy();
  }

    this.spinner.show();
    this.transactionService.monthsperYear(this.year)
      .subscribe(res => {
        console.log(res);

        let rchAmount = res['Monthly_transactions'].map(res => res.Recharge);
        let payAmount = res['Monthly_transactions'].map(res => res.Payment);
        let months = res['Monthly_transactions'].map(res => res.month);

        let ctx = document.getElementById('monthsChart');
        this.monthschart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: months,
            datasets: [
              {
                label: 'Total de Recarga',
                data: rchAmount,
                backgroundColor: '#7EC0EE',
                fill: true
              },
              {
                label: 'Total de Cobro',
                data: payAmount,
                backgroundColor: '#FFC0CB',
                fill: true
              }
            ]
          },
          options: {
            legend: {
              display: true
            },
            scales: {
              xAxes: [{
                // display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Meses del Años'
                }
              }],
              yAxes: [{
                // display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Monto ($)'
                }
              }]
            },
            responsive: false
          }
        });

      });
    this.spinner.hide();
  }

  yearsCharts() {
    if (this.yearschart != null) {
      this.yearschart.destroy();
  }

    this.spinner.show();
    this.transactionService.betweenYears(this.initial_year, this.final_year)
      .subscribe(res => {
        // console.log(res);

        let rchAmount = res['Yearly_transactions'].map(res => res.Recharge);
        let payAmount = res['Yearly_transactions'].map(res => res.Payment);
        let years = res['Yearly_transactions'].map(res => res.year);

        let ctx = document.getElementById('yearsChart');
        this.yearschart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: years,
            datasets: [
              {
                label: 'Total de Recarga',
                data: rchAmount,
                backgroundColor: '#7EC0EE',
                fill: true
              },
              {
                label: 'Total de Cobro',
                data: payAmount,
                backgroundColor: '#FFC0CB',
                fill: true
              }
            ]
          },
          options: {
            legend: {
              display: true
            },
            scales: {
              xAxes: [{
                // display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Años'
                }
              }],
              yAxes: [{
                // display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Monto ($)'
                }
              }]
            },
            responsive: false
          }
        });

      });
    this.spinner.hide();
  }

  dayCharts() {
    this.spinner.show();
    this.transactionService.singleDay(this.sDay, this.sMonth, this.sYear)
      .subscribe(res => {
        // console.log(res);

        let rchAmount = res['transactions'].Recharge;
        let payAmount = res['transactions'].Payment;
        let day = [res['transactions'].day];

        const context = document.getElementById('singledayChart');
        this.singledaychart = new Chart(context, {
          type: 'doughnut',
          data: {
            labels: ['Recargas', 'Pagos'],
            datasets: [
              {
                label: "Monto Acumulado",
                data: [rchAmount, payAmount],
                backgroundColor: ['#7EC0EE', '#FFC0CB'],
                fill: true
              }
            ],
            options: {
              responsive: false,
              legend: false,
              maintainAspectRatio: false
            }
          }
        });

      });
    this.spinner.hide();
  }

}
