import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/userService';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";

export type ChartOptions = {
  series?: ApexAxisChartSeries | any;
  chart?: ApexChart | any;
  xaxis?: ApexXAxis | any;
  dataLabels?: ApexDataLabels | any;
  grid?: ApexGrid | any;
  stroke?: ApexStroke | any;
  title?: ApexTitleSubtitle | any;
};

@Component({
  selector: 'app-graph-customer-map',
  templateUrl: './graph-customer-map.component.html',
  styleUrls: ['./graph-customer-map.component.css']
})
export class GraphCustomerMapComponent implements OnInit {
  public chartOptions: Partial<ChartOptions> = {};
  appointmentsByMonth: any[] | undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const allMonths = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    this.userService.getAppointmentsByMonth().subscribe(
      data => {
        const monthlyAppointments: { [key: string]: number } = {};

        data.forEach(item => {
          const [month, appointments] = item.month.split(': ');
          if (monthlyAppointments[month]) {
            monthlyAppointments[month] += parseInt(appointments);
          } else {
            monthlyAppointments[month] = parseInt(appointments);
          }
        });

        const seriesData = allMonths.map(month => monthlyAppointments[month] || 0);

        this.chartOptions = {
          series: [{ name: 'Appointments', data: seriesData }],
          chart: {
            height: 350,
            type: "line",
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: "straight"
          },
          title: {
            text: "Appointments by Month",
            align: "left"
          },
          grid: {
            row: {
              colors: ["#f3f3f3", "transparent"],
              opacity: 0.5
            }
          },
          xaxis: {
            categories: allMonths
          }
        };
      },
      error => {
        console.error(error);
      }
    );
  }
}
