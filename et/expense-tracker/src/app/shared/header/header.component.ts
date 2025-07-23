import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  activeLink: string = '';
  routerSubscription: Subscription | null = null;
;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setActiveLinkBasedOnUrl(event.urlAfterRedirects);
      }
    });

    this.setActiveLinkBasedOnUrl(this.router.url);
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  setActiveLinkBasedOnUrl(url: string) {
    if (url.includes('dashboard')) {
      this.activeLink = 'dashboard';
    } else if (url.includes('expense')) {
      this.activeLink = 'expense';
    } else if (url.includes('theme')) {
      this.activeLink = 'theme';
    } else if (url.includes('login')) {
      this.activeLink = 'logout';
    } else {
      this.activeLink = ''; 
    }
  }

  logout() {
    this.activeLink = 'logout';
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  dashboard() {
    this.activeLink = 'dashboard';
    this.router.navigate(['/dashboard']);
  }

  expense() {
    this.activeLink = 'expense';
    this.router.navigate(['/expense']);
  }

  theme() {
    this.activeLink = 'theme';
    this.router.navigate(['/theme']);
  }
}
