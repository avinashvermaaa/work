import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth.service'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule,Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  email!: string;
  password!: string;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe(
        (response) => {

          if (response && response.length > 0) {
            console.log('Login successful!');
            
            this.snackBar.open(`Welcome ${response[0].username}`, 'Close', {
              duration: 3000, 
              horizontalPosition: 'center', 
              verticalPosition: 'bottom',
              panelClass: 'success-snackbar' 
            });
            this.router.navigate(['/dashboard']);
            console.log('✅ Redirecting to /dashboard');
          } 
          
          else {
            console.log('Login failed: Invalid credentials.');
              this.snackBar.open('Invalid credentials!', 'Close', {
                duration: 3000, 
                horizontalPosition: 'center', 
                verticalPosition: 'bottom',
                panelClass: 'success-snackbar' 
              });
          }
        },
        (error) => {
          console.error('Login error:', error);
        }
      );
    } else {
      console.warn('Form is invalid');
    }
  }

  onSubmit() {
    this.onLogin(); // delegate to onLogin
  }
}
