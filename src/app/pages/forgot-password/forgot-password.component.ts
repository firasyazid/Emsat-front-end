import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/userService';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email: string = '';

  constructor(private userService: UserService,
    private snackBar: MatSnackBar,

  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.email) {
       return;
    }

    this.userService.forgetpassword(this.email).subscribe(
      (response) => {

        console.log('Password reset request successful:', response);
        this.openSnackBar('Password reset request successful, Check you email', 'Close');
       },
      (error) => {
        console.error('Password reset request failed:', error);
        this.openSnackBar('Password reset request failed', 'Close');

       }
    );
  }

  openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, {
			duration: 2000,
 			horizontalPosition: 'left',
			verticalPosition: 'bottom',

 		});
	}
}
