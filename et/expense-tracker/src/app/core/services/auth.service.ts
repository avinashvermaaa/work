import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject, throwError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { catchError, switchMap } from 'rxjs/operators';

declare var localStorage: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:3000';
  private loggedIn = false;
  private platformId = inject(PLATFORM_ID);

  private userEmailSubject = new BehaviorSubject<string | null>(null);
  userEmail$ = this.userEmailSubject.asObservable();

  constructor(private http: HttpClient) {
    if (isPlatformBrowser(this.platformId)) {
      const savedEmail = localStorage.getItem('userEmail');
      if (savedEmail) this.userEmailSubject.next(savedEmail);
    }
  }

restoreUserSession(): Promise<void> {
  return new Promise((resolve) => {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.loggedIn = JSON.parse(userData); 
    }
    resolve(); 
  });
}

  login(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/users?email=${email}&password=${password}`).pipe(
      tap((res: any[]) => {
        if (res.length > 0 && isPlatformBrowser(this.platformId)) {
          this.loggedIn = true;
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userEmail', res[0].email);
          this.userEmailSubject.next(res[0].email); 
        }
      })
    );
  }

  getUserEmail(): string | null {
    return this.userEmailSubject.value;
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('isLoggedIn') === 'true';
    }
    return false;
  }

  logout(): void {
    this.loggedIn = false;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userEmail');
    }
    this.userEmailSubject.next(null);
  }

  signup(userData: { username: string; email: string; password: string }): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/users?email=${userData.email}`).pipe(
      switchMap((res: any[]) => {
        if (res.length > 0) {
          // Email exists already, throw an error.
          return throwError(() => new Error('Email is already in use'));
        } else {
          // Proceed with creating a new user if email is unique
          return this.http.post<any>(`${this.baseUrl}/users`, userData);
        }
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
