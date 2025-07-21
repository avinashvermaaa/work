import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';
// import { AuthService } from './core/services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'expense-tracker';
    isAppReady = false;

    constructor(private authService: AuthService) {
    console.log('🌟 AppComponent loaded');
  }

    ngOnInit() {
    this.authService.restoreUserSession().then(() => {
      this.isAppReady = true;
    });

}
}