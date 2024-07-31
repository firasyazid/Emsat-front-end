import { Component, OnInit } from '@angular/core';
 import { UserService } from '../services/userService';
  import { Router } from '@angular/router';
  import { MatSnackBar } from '@angular/material/snack-bar';
 import { ConfirmationService } from 'primeng/api';  
import { Form } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Speciality } from '../models/speciality';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {
  imageDisplay!: string | ArrayBuffer;
specialite: Speciality[] = [];


  speciality: Speciality ={ 
    id: '',
  titre: '',
  icon: '',
   }

  constructor( 

    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private snackBar: MatSnackBar,


  ) { }

  ngOnInit(): void {
    this.getSpeciality();
  }

    getSpeciality() {
    this.userService.getSpec().subscribe((res: any) => {
      this.specialite = res;
    });

  }
	open(content: any) {
		this.modalService.open(content);
	}


  addSpec(medecin: Speciality, imageUrl: string ): void {
    this.userService.addSpec(medecin, imageUrl).subscribe(
      response => {
        console.log('speciality added successfully:', response);
        this.openSnackBar2('Speciality added successfully', 'Close');
        this.getSpeciality();
        this.modalService.dismissAll();
       },
      error => {
        console.error('Error adding medecin:', error);
        this.openSnackBar2('Error adding doctor', 'Close');}
    );
  }
  openSnackBar2(message: string, action: string) {
    this.snackBar.open(message, action, {
        duration: 2000,  
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
    });
  }
  onImageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.speciality.icon = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imageDisplay = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }


  deletespec(userId: string) {
    this.userService.deleteSpec(userId).subscribe(() => {
        this.getSpeciality();
        this.openSnackBar2('Speciality deleted successfully', 'Close');
    });
}


  
}
