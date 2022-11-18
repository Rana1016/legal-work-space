import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/shared/services/dashboard.service';
import * as Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import * as moment from 'moment';
@Component({
  selector: 'app-reports-main',
  templateUrl: './reports-main.component.html',
  styleUrls: ['./reports-main.component.scss']
})
export class ReportsMainComponent implements OnInit {
  constructor(private dashboardService: DashboardService) { }
  selectedYear = moment().year();
  registrationYears: number[] = [];

  caseChart: typeof Highcharts = Highcharts;
  caseChartOpt!: Highcharts.Options;
  months = moment.monthsShort();
  newClients: number[] = [];
  newMatters: number[] = [];

  outcomeChart: typeof Highcharts = Highcharts;
  outcomeChartOpt!: Highcharts.Options;
  outcomeData!: {
    outcome_positive: number,
    outcome_negative: number,
    outcome_neutral: number,
  };

  successChart: typeof Highcharts = Highcharts;
  successChartOpt!: Highcharts.Options;
  successData!: {
    objectiveMet: number,
    objectiveNotMet: number,
    instructionsWithdrawn: number,
    noFurtherInstructions: number
  };

  inProgressCases?: number;
  closedCases?: number;
  totalCases?: number;

  ngOnInit(): void {
    for (var i = 0; i <= 7; i++) {
      this.registrationYears.push(this.selectedYear - i);
    };
    this.caseChartInit();
  }
  caseChartInit() {
    this.dashboardService.getDashboardStats(this.selectedYear).subscribe(({ newAndReturning, tiles: [{ totalClosedCase, totalInProgressCase, totalCases }], caseOutcomes, caseResults }) => {
      this.inProgressCases = totalInProgressCase;
      this.closedCases = totalClosedCase;
      this.totalCases = totalCases;
      this.outcomeData = {
        outcome_negative: caseOutcomes.find((e: any) => e.caseOutcome == 'Outcome Negative')?.percentage || 0,
        outcome_positive: caseOutcomes.find((e: any) => e.caseOutcome == 'Outcome Positive')?.percentage || 0,
        outcome_neutral: caseOutcomes.find((e: any) => e.caseOutcome == 'Outcome Neutral')?.percentage || 0
      }
      this.successData = {
        objectiveMet: caseResults.find((e: any) => e.caseResult == 'Objective Met')?.percentage || 0,
        objectiveNotMet: caseResults.find((e: any) => e.caseResult == 'Objective Not Met')?.percentage || 0,
        instructionsWithdrawn: caseResults.find((e: any) => e.caseResult == 'Instructions Withdrawn')?.percentage || 0,
        noFurtherInstructions: caseResults.find((e: any) => e.caseResult == 'No Further Instructions')?.percentage || 0,
      };
      for (var i = 0; i <= 11; i++) {
        newAndReturning?.forEach(({ month, new: newClients, returning: newMatters }: { month: string; returning: number; new: number; }) => {
          month?.startsWith(`${i + 1} `) ? (this.newClients[i] = newClients, this.newMatters[i] = newMatters) : (this.newClients[i] = 0, this.newMatters[i] = 0);
        });
        i == 11 && (this.caseChartOpt = {
          title: {
            text: `My Cases in ${this.selectedYear}`,
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
        });
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
    })
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
