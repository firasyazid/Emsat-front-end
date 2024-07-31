import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/userService';
import { test } from '../models/tests';
import {Router} from '@angular/router';

 

@Component({
  selector: 'app-test-categories',
  templateUrl: './test-categories.component.html',
  styleUrls: ['./test-categories.component.css']
})
export class TestCategoriesComponent implements OnInit {


  test: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router

  ) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    console.log("test id",id);
    this.userService.GetTestbyId(id || '').subscribe((test) => {
      this.test = test;
 
    });
  }

  navigateToCategories(testId: string): void {
    this.router.navigate(['/admin/questions', testId]);
  }

  getDisplayName(name: string): string {
    return name.split(' - copy ')[0];
  }


}
