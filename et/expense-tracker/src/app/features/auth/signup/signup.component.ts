import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule,Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  hide: boolean = true;
  hide1: boolean = true;

  constructor(private fb: FormBuilder, private authService: AuthService, private snackBar: MatSnackBar, private router: Router) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const { username, email, password, confirmPassword } = this.signupForm.value;

      // Check if passwords match
      if (password !== confirmPassword) {
        this.snackBar.open('Passwords do not match!', 'Close', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: 'error-snackbar'
        });
        return; // Prevent form submission if passwords don't match
      }

      // Proceed with signup if passwords match
      this.authService.signup({ username, email, password }).subscribe(
      (response) => {
        this.snackBar.open('Registration Successful!', 'Close', {
          duration: 3000, 
          horizontalPosition: 'center', 
          verticalPosition: 'bottom',
          panelClass: 'success-snackbar' 
        });
        // console.log('Signup successful!');
        this.router.navigate(['/login']);
      },
        (error) => {
          if (error.message === 'Email is already in use') {
            this.snackBar.open('Email is already in use. Please use a different email or try login', 'Close', {
              duration: 4000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              panelClass: 'error-snackbar'
            });
          } else {
            this.snackBar.open('Registration Unsuccessful!', 'Close', {
              duration: 3000, 
              horizontalPosition: 'center', 
              verticalPosition: 'bottom',
              panelClass: 'error-snackbar' 
            });
          }
        }
      );
    }
  }
}
