import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/userService';


import { 
    ChartComponent, 
    ApexAxisChartSeries, 
    ApexChart, 
    ApexXAxis, 
    ApexDataLabels, 
    ApexStroke, 
    ApexYAxis, 
    ApexTitleSubtitle, 
    ApexLegend, 
    ApexMarkers, 
    ApexGrid, 
    ApexStates, 
    ApexFill,
    ApexTooltip
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  stroke: ApexStroke | any;
  dataLabels: ApexDataLabels | any;
  yaxis: ApexYAxis | any;
  title: ApexTitleSubtitle | any;
  labels: string[] | any;
  legend: ApexLegend | any;
  subtitle: ApexTitleSubtitle | any;
  colors: string[] | any;
  markers: ApexMarkers | any;
  grid: ApexGrid | any;
  states: ApexStates | any;
  fill: ApexFill | any;
  tooltip: ApexTooltip | any;
};

@Component({
  selector: 'app-graph-orders',
  templateUrl: './graph-orders.component.html',
  styleUrls: ['./graph-orders.component.css']
})
export class GraphOrdersComponent implements OnInit {

  @ViewChild("chart") chart!: ChartComponent;
 

  appCount: number = 0;
  constructor( 
    private userService: UserService

  ) {
   
  }

  ngOnInit(): void {
    this.getAppNumber();
   }

  getAppNumber(): void {
    this.userService.getTotalMedecins().subscribe(
      (result) => {
        this.appCount = result.count;
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
