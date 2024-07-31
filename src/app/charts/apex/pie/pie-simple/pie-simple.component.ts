import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import { UserService } from 'src/app/services/userService';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexLegend
} from 'ng-apexcharts';

export type ChartOptions = {
  series?: ApexNonAxisChartSeries | any;
  chart?: ApexChart | any;
  responsive?: ApexResponsive[] | any;
  labels?: any;
  legend?: ApexLegend | any;
};

@Component({
  selector: 'app-pie-simple',
  templateUrl: './pie-simple.component.html',
  styleUrls: ['./pie-simple.component.css']
})
export class PieSimpleComponent implements OnInit {
  percentages: any = {};

  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> = {
    series: [],
    chart: {
      width: 380,
      type: 'pie'
    },
    labels: [ 
      

    ],
    responsive: [
      {
        breakpoint: 575,
        options: {
          chart: {
            width: 300
          },
          legend: {
            position: 'bottom',
            show: true,
          },
          dataLabels: {
            enabled: false,
          },
        }
      }
    ]
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserRolePercentages().subscribe(
      data => {
        this.percentages = data;
        console.log('User role percentages:', this.percentages);

        // Update chart options with the fetched data
        this.chartOptions.series = [
          this.percentages['Student'] || 0,
          this.percentages['Teacher'] || 0,
          this.percentages['Super Admin'] || 0
        ];

        this.chartOptions.labels = [
          'Student',
          'Teacher',
          'Super Admin'
        ];

        // Manually trigger chart update
        this.chart.updateOptions(this.chartOptions);
      },
      error => {
        console.error('Error fetching user role percentages:', error);
      }
    );
  }
}
