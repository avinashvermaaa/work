import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service'; 
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
  hide: boolean = true;


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
          const user = response[0];

          localStorage.setItem('userEmail', user.email);

          this.snackBar.open(`Welcome ${user.username}`, 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: 'success-snackbar'
          });

          this.router.navigate(['/dashboard']);
        } else {
          this.snackBar.open('Invalid credentials!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: 'success-snackbar'
          });
        }
      },
      (error) => {
      }
    );
  } else {
  }
}

  onSubmit() {
    this.onLogin(); 
  }
}
