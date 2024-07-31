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

 


@Component({
  selector: 'app-graph-customers',
  templateUrl: './graph-customers.component.html',
  styleUrls: ['./graph-customers.component.css']
})
export class GraphCustomersComponent implements OnInit {

  @ViewChild("chart") chart!: ChartComponent;
  

  usersCount: number = 0;
  constructor( 
    private userService: UserService
  ) {
    
  }

  ngOnInit(): void {
    this.getUsersNumber();

  }

  getUsersNumber(): void {
    this.userService.getTotalUsers().subscribe(
      (result) => {
        this.usersCount = result.count;
      },
      (error) => {
        console.error(error);
      }
    );
  }
  


}
