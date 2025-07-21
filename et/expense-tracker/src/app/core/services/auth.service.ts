import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

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

  login(email: string, password: string): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/users?email=${email}&password=${password}`).pipe(
      tap((res: any[]) => {
        if (res.length > 0 && isPlatformBrowser(this.platformId)) {
          this.loggedIn = true;
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userEmail', res[0].email);
          this.userEmailSubject.next(res[0].email); // ✅ push to observable
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
    return this.http.post<any>(`${this.baseUrl}/users`, userData);
  }
}
