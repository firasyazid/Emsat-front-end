import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/userService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalstorageService } from 'src/app/services/LocalstorageService';

@Component({
  selector: 'app-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css']
})
export class ComposeComponent implements OnInit {
  files: File[] = [];
  recipientEmail: string = '';
  subject: string = '';
  messageText: string = '';
  userName: string | null = null;  
 
  constructor(private emailService: UserService, private snackBar: MatSnackBar , 

	private localstorageService: LocalstorageService,
	

  ) { }

  ngOnInit(): void { 

	this.userName = this.localstorageService.getUserName();


  }

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  sendEmail() {
    if (!this.recipientEmail || !this.subject || !this.messageText) {
      this.openSnackBar2('Please fill in all fields', 'Close');
      return;
    }

    const file = this.files.length > 0 ? this.files[0] : undefined;

    this.emailService.sendEmailWithAttachment(this.messageText, this.subject, this.recipientEmail, file).subscribe({
      next: (response) => {
        console.log('Response:', response);  // Log the response
        this.openSnackBar2('Email sent successfully', 'Close');
        this.resetForm();
      },
      error: (error) => {
        console.error('Error sending email:', error);
        this.openSnackBar2('Error sending email. Please try again.', 'Close');
        console.error('Error object:', error);
        if (error.error) {
          console.error('Error details:', error.error);
        }
      }
    });
  }

  openSnackBar2(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
    });
  }

  private resetForm() {
    this.files = [];
    this.recipientEmail = '';
    this.subject = '';
    this.messageText = '';
  }
}
