import { Component, OnInit} from '@angular/core';
 import { UserService } from '../../services/userService';
  import { Router } from '@angular/router';
 import { MessageService } from 'primeng/api';
 import { MatSnackBar } from '@angular/material/snack-bar';
 import { ConfirmationService } from 'primeng/api';  
import { Form } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Region } from 'src/app/models/region';
 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
 })
export class AlertComponent implements OnInit {


  regions: Region[] = [];

  region: Region ={
    id: '',
    name: '',
   }


	constructor(  
    private userService: UserService,
    private router: Router,
    private messageService: MessageService,
    private snackBar: MatSnackBar,
    private confirmationService: ConfirmationService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder

  ) { }
   

   ngOnInit(): void {
    this.getRegions();
  } 


  getRegions() {
    this.userService.getRegionPhramacy().subscribe((data) => {
      this.regions = data;
    });
  }

  open(content: any) {
		this.modalService.open(content);
	}


  addSpec(medecin: Region ): void {
    this.userService.createRegion(medecin).subscribe(
      response => {
         this.openSnackBar2('Region added successfully', 'Close');
        this.getRegions();
        this.modalService.dismissAll();
       },
      error => {
        console.error('Error adding region:', error);
        this.openSnackBar2('Error adding region', 'Close');}
    );
  }
  openSnackBar2(message: string, action: string) {
    this.snackBar.open(message, action, {
        duration: 2000,  
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
    });
  }

  DeleteRegion(id: string): void {  
    this.userService.deleteRegion(id).subscribe(
      response => {
        this.openSnackBar2('Region deleted successfully', 'Close');
        this.getRegions();
      },
      error => {
        console.error('Error deleting region:', error);
        this.openSnackBar2('Error deleting region', 'Close');
      }
    );
  }

}
