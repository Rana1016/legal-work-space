import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import * as moment from 'moment';

Exporting(Highcharts);
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  constructor() {}
  selectedYear = moment().year();
  registrationYears = [2015, 2016, 2017, 2018, 2019, 2020, 2021].reverse();

  caseChart: typeof Highcharts = Highcharts;
  caseChartOpt!: Highcharts.Options;
  months = moment.monthsShort();
  newClients = [0, 0, 0, 0, 0, 0, 0, 5, 2, 0, 0, 0];
  newMatters = [0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0];

  outcomeChart: typeof Highcharts = Highcharts;
  outcomeChartOpt!: Highcharts.Options;
  outcomeData: {
    outcome_positive: number,
    outcome_negative: number,
    outcome_neutral: number,
  } = {
    outcome_positive: 40,
    outcome_negative: 20,
    outcome_neutral: 40
  }

  successChart: typeof Highcharts = Highcharts;
  successChartOpt!: Highcharts.Options;
  successData: {
    objectiveMet: number,
    objectiveNotMet: number,
    instructionsWithdrawn: number,
    noFurtherInstructions: number
  } = {
    objectiveMet: 100,
    objectiveNotMet: 0,
    instructionsWithdrawn: 0,
    noFurtherInstructions: 0
  }

  ngOnInit(): void {
    this.caseChartInit();
  }
  caseChartInit() {
    this.caseChartOpt = {
      title: {
        text: `Cases in ${this.selectedYear} <br> All Offices`,
        style: {
          color: '#292929',
          fontSize: '18px',
          fontweight: 'bold',
        }
      },
      credits :{
        enabled: false
      },
      tooltip: {
        headerFormat: `<div class="w-100" style="font-size:12px">{point.key} ${this.selectedYear}</div>`,
        useHTML: true,
      },
      xAxis: {
        categories: this.months,
        max: 11,
      },
      yAxis: {
        title: {
          text: 'No. of Files/Matters',
          style: {
            'font-weight': '900',
          },
        },
      },
      plotOptions: {
        column: {
          pointPadding: 0.1,
          borderWidth: 0,
        },
      },
      series: [
        {
          type: 'column',
          data: this.newClients,
          color: '#78B41E',
          name: 'New Clients',
        },
        {
          type: 'column',
          data: this.newMatters,
          name: 'New Matters',
          color: '#363636',
        },
      ],
    };

    this.outcomeChartOpt = {
      chart: {
        plotShadow: false,
      },
      title: {
        text: 'My Cases (Outcomes)',
        align: 'left',
        style: {
          color: '#292929',
          fontSize: '18px',
          fontweight: 'bold',
        }
      },
      credits: {
        enabled: false
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
          },
          showInLegend: true,
        },
      },
      series: [
        {
          type: 'pie',
          name: 'Percentage',
          data: [
            {
              name: 'Outcome Positive',
              y: this.outcomeData.outcome_positive,
              sliced: true,
              selected: true,
              color: '#78B41E'
            },
            {
              name: 'Outcome Negative',
              y: this.outcomeData.outcome_negative,
              color: '#363636',
            },
            {
              name: 'Outcome Neutral',
              y: this.outcomeData.outcome_neutral,
              color: '#DE1771'
            },
          ],
        },
      ],
    };
    
    this.successChartOpt = {
      title: {
        text: 'My Cases (Results)',
        align: 'left',
        style: {
          color: '#292929',
          fontSize: '18px',
          fontweight: 'bold',
        }
      },
      credits: {
        enabled: false
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
          },
          showInLegend: true,
        },
      },
      series: [
        {
          type: 'pie',
          name: 'Percentage',
          data: [
            {
              name: 'Objective Met',
              y: this.successData.objectiveMet,
              sliced: true,
              selected: true,
              color: '#78B41E'
            },
            {
              name: 'Objective Not Met',
              y: this.successData.objectiveNotMet,
              color: '#363636',
            },
            {
              name: 'Instructions Withdrawn',
              y: this.successData.instructionsWithdrawn,
              color: '#DE1771'
            },
            {
              name: 'No Further Instructions',
              y: this.successData.noFurtherInstructions,
              color: '#FFBA00'
            },
          ],
        },
      ],
    };
  }
  changeYear() {
    this.caseChartInit();
  }

  get totalClients() {
    return this.newClients.reduce((a,b) => a+b);
  }

  get totalMatters() {
    return this.newMatters.reduce((a,b) => a+b);
  }
}
