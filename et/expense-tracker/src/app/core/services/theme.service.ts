import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ThemeModel } from '../../shared/theme/theme-model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private baseUrl = 'http://localhost:3000/themes'; 

  constructor(private http: HttpClient) {
    
  }

  getThemes(): Observable<ThemeModel[]> {
    return this.http.get<ThemeModel[]>(this.baseUrl);
  }

  updateTheme(primary: string, accent: string) {
    document.documentElement.style.setProperty('--primary-color', primary);
    document.documentElement.style.setProperty('--accent-color', accent);
  }

  createTheme(theme: ThemeModel): Observable<ThemeModel> {
    return this.http.post<ThemeModel>(this.baseUrl, theme);
  }

  deleteTheme(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  saveTheme(theme: ThemeModel): Observable<ThemeModel> {
    return this.http.put<ThemeModel>(`${this.baseUrl}/${theme.id}`, theme);
  }
}
