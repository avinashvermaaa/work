import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @ViewChild(MatMenuTrigger, { static: false }) menuTrigger: MatMenuTrigger | undefined;

  constructor(private authService: AuthService, private router: Router) {}

    ngAfterViewInit() {
    // To prevent errors related to accessing 'menu' before it is initialized
    if (this.menuTrigger) {
      console.log('menuTrigger is initialized');
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
  dashboard() {
    this.router.navigate(['/dashboard']);
  }
  
  expense() {
    this.router.navigate(['/expense']);
  }
  theme() {
    this.router.navigate(['/theme']);
  }

  toggleMenu() {
    if (this.menuTrigger) {
      this.menuTrigger.openMenu();  // Use open() to show the menu
    }
  }
}
