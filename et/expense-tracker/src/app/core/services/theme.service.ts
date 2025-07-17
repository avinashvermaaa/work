import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ThemeModel } from '../../shared/theme/theme-model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private baseUrl = 'http://localhost:3000/theme';

  constructor(private http: HttpClient) {}

    getExpenses(): Observable<ThemeModel[]> {
      return this.http.get<ThemeModel[]>(this.baseUrl);
    }

  updateTheme(primary: string, accent: string) {
    document.documentElement.style.setProperty('--primary-color', primary);
    document.documentElement.style.setProperty('--accent-color', accent);
  }
}
