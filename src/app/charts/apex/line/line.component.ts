import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/userService';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit {

  constructor( 

    private userService: UserService

  ) { }

  ngOnInit(): void {
  }

}
