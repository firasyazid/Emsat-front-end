import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill
} from "ng-apexcharts";
import { UserService, MonthPercentage } from 'src/app/services/userService';

export type ChartOptions = {
  series?: ApexAxisChartSeries | any;
  chart?: ApexChart | any;
  dataLabels?: ApexDataLabels | any;
  plotOptions?: ApexPlotOptions | any;
  yaxis?: ApexYAxis | any;
  xaxis?: ApexXAxis | any;
  fill?: ApexFill | any;
  title?: ApexTitleSubtitle | any;
};

@Component({
  selector: 'app-column-data-labels',
  templateUrl: './column-data-labels.component.html',
  styleUrls: ['./column-data-labels.component.css']
})
export class ColumnDataLabelsComponent implements OnInit {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  expirationStats: MonthPercentage[] = [];

  constructor(private userService: UserService) {
    this.chartOptions = {
      series: [
        {
          name: "Count",
          data: []
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top" // top, center, bottom
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val: any) {
          return val.toString(); // Remove percentage symbol
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },
      xaxis: {
        categories: [],
        position: "top",
        labels: {
          offsetY: -18
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100]
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: true, // Show y-axis labels
          formatter: function(val: any) {
            return val.toString();
          }
        }
      },
      title: {
        text: "User accounts expire monthly",
        offsetY: 330,
        align: "center",
        style: {
          color: "#444"
        }
      }
    };
  }

  ngOnInit(): void {
    this.userService.getExpirationStats().subscribe(
      (data) => {
        this.expirationStats = data;
        this.updateChartOptions();
        console.log('Expiration stats22', this.expirationStats);
      },
      (error) => {
        console.error('Error fetching expiration stats', error);
      }
    );
  }

  updateChartOptions() {
    const categories = this.expirationStats.map(stat => stat.month);
    const seriesData = this.expirationStats.map(stat => stat.count); // Update to use count

    this.chartOptions = {
      ...this.chartOptions,
      series: [
        {
          name: "Count",
          data: seriesData
        }
      ],
      xaxis: {
        ...this.chartOptions.xaxis,
        categories: categories
      }
    };
  }
}
