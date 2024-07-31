import { Component, OnInit } from '@angular/core';
import { User,Role 
 } from '../models/user';
import { UserService } from '../services/userService';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationService } from 'primeng/api';  
import { Appointment } from '../models/appointement';
import { LocalstorageService } from '../services/LocalstorageService';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {
  users: User[] = [];
  displayDialog = false;
  displayDialog2 = false;
  isModal = false;
  appoinments: Appointment[] = [];
  appoinment2: Appointment [] = [];
  appoinment3: Appointment [] = [];
  expiredUsers: User[] = [];
 
  searchText: string = '';
  searchTerm: string = '';



  newUser: User = { 
    fullname: '',
    email: '',
    password: '',
    role: Role.Student ,
    expiresAt: new Date()   

  };

  Role = Role;   
  filteredUsers: User[] = [];  
  p: number = 1;  
  selectedFilter: string = 'All';  


   constructor( 

    private userService: UserService,
    private router: Router,
    private messageService: MessageService,
    private snackBar: MatSnackBar,
    private confirmationService: ConfirmationService,  
      private localStorageService: LocalstorageService // Example service name for localStorage operations

    
 
  ) { }

  ngOnInit(): void {
    this._getUsers();
    this._getAppointements();
    this._getAppointements2();
    this._getAppointements3();
 
  }
 
  roleOptions = Object.values(Role);
  openEditDialog(user: User) {
    this.newUser = { ...user };
    this.displayDialog2 = true;
  }


  private _getUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
     });
  }


  private _getAppointements2() {
    this.userService.getAppointementsConfirmed().subscribe((appointments) => {
      this.appoinment2 = appointments;
    });
  }
  private _getAppointements3() {
    this.userService.getAppointementsCancelled().subscribe((appointments) => {
      this.appoinment3 = appointments;
    });
  }


private _getAppointements() {
    this.userService.getAppointements().subscribe((appointments) => {
      this.appoinments = appointments;
    });
  }

  deletapp(userId: string) {
    this.userService.deleteApp(userId).subscribe(() => {
        this._getAppointements();
        this.openSnackBar2('Appoinetement deleted successfully', 'Close');
    });
}



  showDialog(): void {
     this.displayDialog = true;
  }

  showDialog2(): void { 
    this.displayDialog2 = true;
  }

  hideDialog2(): void {
    this.displayDialog2 = false;
  }
  hideDialog(): void {
     this.displayDialog = false;
  }

  
  _addUser(user: any) {
    if (!this.isFormValid()) {
      this.openSnackBar('Please fill in all required fields', 'Close');
      return;
    }
  
    if (!user.fullname || !user.email || !user.password || !user.role) {
      this.openSnackBar('All fields are required', 'Close');
      return;
    }
  
    
  
    if (user.role === 'SuperAdmin' || user.role === 'Teacher') {
      delete user.expiresAt;  // Remove expiresAt field for Super Admin and Teacher roles
    }
  
    this.userService.createUser(user).subscribe(() => {
      this.displayDialog = false; 
      this._getUsers();
      this.openSnackBar('User added successfully', 'Close');
    });
  }
  
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  
   
  

  isFormValid(): boolean {
    if (!this.newUser.fullname ||
        !this.newUser.email ||
        !this.newUser.password) {
          this.openSnackBar('Please fill all fields', 'Close');
     
      return false;
    }

    return true;
  }
   
  getUsersByExpire() {
     this.userService.getUsersbyExpire().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error('Error fetching expired users: ', error);
      }
    );
  }
  

  applyFilter() {
    if (this.selectedFilter === 'Date') {
      this.getUsersByExpire();  
     } else {
      this._getUsers();  
    }
  }

 



  onUpdateUser() {
    this.userService.updateUser(this.newUser).subscribe(
      response => {
        console.log('User updated successfully', response);
        this.openSnackBar2('User updated successfully', 'Close');

        this.displayDialog2 = false;  
        this._getUsers();
      },
      error => {
        console.error('Error updating user', error);
        this.openSnackBar2('User is not updated ! ', 'Close');

      }
    );
  }
 
  deleteUserConfirmation(userId: string) {
    const loggedInUserRole = this.localStorageService.getRole();
  
    if (loggedInUserRole !== 'Super Admin') {
      this.openSnackBar('Access denied. You do not have permission to delete users.', 'Close');
      return;
    }
  
    if (window.confirm('Are you sure you want to delete this user?')) {
      this.deleteUser(userId);
    }
  }

  
  deleteUser(userId: string) {
    console.log('Deleting user with ID:', userId);
    this.userService.deleteUser(userId).subscribe(
      () => {
        console.log('User deleted successfully');
        this._getUsers();  
        this.openSnackBar2('User deleted successfully', 'Close');
      },
      error => {
        console.error('Error deleting user:', error);
        this.openSnackBar2('Error deleting user', 'Close');
      }
    );
  }
  
  

openSnackBar2(message: string, action: string) {
    this.snackBar.open(message, action, {
        duration: 2000,  
         horizontalPosition: 'left',
        verticalPosition: 'bottom',
     });


}


  
search(): void {
  if (!this.searchTerm) {
    this.openSnackBar('Please enter a search term', 'Close');
    this._getUsers();
    return;
  }

  if (this.searchTerm.trim()) {
    this.userService.searchUsers(this.searchTerm.trim()).subscribe(
      users => {
        this.users = users;
        if (users.length === 0) {
          this.openSnackBar('No users found', 'Close');
        }
      },
      error => {
        console.error('Error fetching users:', error);
        this.openSnackBar('Error fetching users', 'Close');
      }
    );
  }  
}

 

}


