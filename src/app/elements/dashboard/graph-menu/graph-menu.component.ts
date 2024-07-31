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
  selector: 'app-graph-menu',
  templateUrl: './graph-menu.component.html',
  styleUrls: ['./graph-menu.component.css']
})
export class GraphMenuComponent implements OnInit {

  @ViewChild("chart") chart!: ChartComponent;
 
  userCount: number = 0;

  constructor( 
    private userService: UserService

  ) {
    
  }

  ngOnInit(): void {
    this.getMedNumber();
  }

  getMedNumber(): void {
    this.userService.getTotalMedecins().subscribe(
      (result) => {
        this.userCount = result.count;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  


}
