import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Auth } from '../services/auth/auth';


@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup implements OnInit  { // Implement OnInit
  signupForm!: FormGroup; // Declare the form group
  hidePassword = true; // Add this property
  hideConfirmPassword = true; // If you have confirm password field
constructor(
  private formBuilder: FormBuilder,
  private snackBar: MatSnackBar,
  private authService: Auth, 
  private router: Router
 ) {}

  ngOnInit(): void {
    this.initializeForm(); // Initialize the form
  }

private initializeForm(): void {
  this.signupForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  }, {
    validators: this.passwordMatchValidator.bind(this)
  });
}

// Add this method to your component
private passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
  // Get values from both password fields
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  // Compare them
  if (password !== confirmPassword) {
    // Set error on confirmPassword field
    control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    return { passwordMismatch: true }; // Form is invalid
  }
  
  return null; // Form is valid (passwords match)
}


  // Add this method
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  // Add this if you have confirm password
  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  

  onSubmit(): void {
   if (this.signupForm.invalid) {
    this.snackBar.open('Please fix form errors before submitting.', 'Close', {
      duration: 3000,
      panelClass: 'error-snackbar'
    });
    return;
  }
  
  this.authService.register(this.signupForm.value).subscribe(
    (response) => {
      this.snackBar.open('Sign up successful!', 'Close', { duration: 5000 });
      this.router.navigateByUrl("/login");
    },
    (error) => {
      this.snackBar.open('Sign up failed. Please try again.', 'Close', { 
        duration: 5000, 
        panelClass: 'error-snackbar' 
      });
      }
    );
  }
}