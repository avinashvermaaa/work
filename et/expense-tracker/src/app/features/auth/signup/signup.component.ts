import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth.service'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatError } from '@angular/material/form-field'; // optional but good for clarity
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private snackBar: MatSnackBar) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      const { username, email, password } = this.signupForm.value;

      this.authService.signup({ username, email, password }).subscribe(
      (response) => {
        this.snackBar.open('Registration Successful!', 'Close', {
          duration: 3000, 
          horizontalPosition: 'center', 
          verticalPosition: 'bottom',
          panelClass: 'success-snackbar' 
        });
        console.log('Signup successful!');

      },
          
        (error) => {
        this.snackBar.open('Registration Unsuccessful!', 'Close', {
          duration: 3000, 
          horizontalPosition: 'center', 
          verticalPosition: 'bottom',
          panelClass: 'success-snackbar' 
        });
          console.error('Signup failed:', error);
        }
      );
    } else {
      console.warn('Signup form is invalid');
    }
  }
}
