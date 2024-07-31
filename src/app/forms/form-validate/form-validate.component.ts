import { Component, OnInit } from '@angular/core';
 import { UserService } from '../../services/userService';
  import { Article } from '../../models/article';
  import { MessageService } from 'primeng/api';
 import { MatSnackBar } from '@angular/material/snack-bar';
 import { ConfirmationService } from 'primeng/api';  
import { Form } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-form-validate',
  templateUrl: './form-validate.component.html',
  styleUrls: ['./form-validate.component.css']
})
export class FormValidateComponent implements OnInit {
	
Categories: Category[] = [];


category: Category = {
  _id: '',
  Categoryname: '',
};
	

  angForm: FormGroup | any;

  constructor(private fb: FormBuilder ,
    private userService: UserService,
    private messageService: MessageService,
    private snackBar: MatSnackBar,
    private confirmationService: ConfirmationService,
     private modalService: NgbModal

  ) {
   }
  
   ngOnInit(): void {
    this.getCtaegories();
  }

    getCtaegories() {
    this.userService.getCat().subscribe((data) => {
      this.Categories = data;
    });

    }

    deleteDoc(userId: string) {
      this.userService.deleteCat(userId).subscribe(() => {
          this.getCtaegories();
          this.openSnackBar2('Category deleted successfully', 'Close');
      });
  }
 
  openSnackBar2(message: string, action: string) {
    this.snackBar.open(message, action, {
        duration: 2000,  
        horizontalPosition: 'left',
        verticalPosition: 'bottom',
    });
  }


  _addCat(user: any) {
		this.userService.createCat(user).subscribe(
			() => {
				this.getCtaegories();
				this.openSnackBar2('Category added successfully', 'Close');
 				this.modalService.dismissAll();
			},
			(error) => {
				console.error('Error:', error);
			}
		);
	}

  open(content: any) {
		this.modalService.open(content);
	}


  addCat(medecin: Category ): void {
    this.userService.createCat(medecin).subscribe(
      response => {
         this.openSnackBar2('Category added successfully', 'Close');
        this.getCtaegories();
        this.modalService.dismissAll();
       },
      error => {
        console.error('Error adding Category:', error);
        this.openSnackBar2('Error adding Category', 'Close');}
    );
  }
   

}
