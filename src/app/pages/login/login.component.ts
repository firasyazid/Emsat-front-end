import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
 import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/AuthService';
import { LocalstorageService } from '../../services/LocalstorageService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup! : FormGroup;
  isSubmitted = false;
  authError = false;
  authMessage = 'Email or Password are wrong';

  constructor(private formBuilder: FormBuilder,
    private auth: AuthService,
    private localstorageService: LocalstorageService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this._initLoginForm();

  }
  private _initLoginForm() {
    this.loginFormGroup = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }
  get loginForm() {
    return this.loginFormGroup.controls;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginFormGroup.invalid) return;
  
    this.auth.login(this.loginForm['email'].value, this.loginForm['password'].value).subscribe(
      (user) => {
        this.authError = false;
        this.localstorageService.setToken(user.token);
        this.localstorageService.setUserName(user.fullname || '');
        this.localstorageService.setRole(user.role || '');
  
         if (user.role === 'Student') {
           this.authError = true;
          this.authMessage = 'Access denied. You do not have permission to access this page.';
        } else {
           this.router.navigate(['/admin/index']);
        }
      },
      (error: HttpErrorResponse) => {
        this.authError = true;
        if (error.status !== 400) {
          this.authMessage = 'Error in the Server, please try again later!';
        }
      }
    );
  }
  

}
