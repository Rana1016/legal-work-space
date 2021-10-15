import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import * as moment from 'moment';
@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {
  constructor() { }

  caseChart: typeof Highcharts = Highcharts;
  caseChartOpt!: Highcharts.Options;
  months = moment.monthsShort();
  newClients = [0, 0, 0, 0, 0, 0, 0, 5, 2, 0, 0, 0];
  newMatters = [0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0];

  ngOnInit(): void {
    this.caseChartOpt = {
      chart: {
        type: "line",
      },
      title: {
        text: "Sales 2021",
      },
      subtitle: {
        text: "",
      },
      xAxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yAxis: {
        min: 0,
        title: {
          text: "Gross Income",
        },
      },
      credits: {
        enabled: false
      },
      tooltip: {
        headerFormat:
          '<span style="font-size:10px">{point.key} 2021</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.2f}</b></td></tr>',
        footerFormat: "</table>",
        shared: true,
        useHTML: true,
      },
      plotOptions: {
        column: {
          pointPadding: 0.1,
          borderWidth: 0,
        },
      },
      series: [
        {
          name: "Monthly Income",
          type: "line",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 753.0, 0, 0, 0],
        },
      ],
    }
  }

}
