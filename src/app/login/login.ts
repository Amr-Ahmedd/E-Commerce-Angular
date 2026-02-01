import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Auth } from '../services/auth/auth';
import { UserStorage } from '../services/storage/user-storage';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit{

constructor(
  private formBuilder: FormBuilder,
  private snackBar: MatSnackBar,
  private authService: Auth, 
  private router: Router    ) {}

loginForm!: FormGroup;
hidePassword = true;
 
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }


  ngOnInit(): void {
    this.initializeForm(); // Initialize the form
  }

private initializeForm(): void {
  this.loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
}

  onSubmit(): void {
   if (this.loginForm.invalid) {
    this.snackBar.open('Please fix form errors before submitting.', 'Close', {
      duration: 3000,
      panelClass: 'error-snackbar'
    });
    return;
  }

  const { email, password } = this.loginForm.value;
  this.authService.login(email, password).subscribe(
    (res) => {
      if (UserStorage.isAdminLoggedIn()) {
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.router.navigate(['/customer/dashboard']);
      }
    },
    (error) => {
      this.snackBar.open('Login failed. Please check your credentials.', 'Error', { 
        duration: 5000, 
      });
      }
    );

  }

}
