import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Model } from '../../features/expense/model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private baseUrl = 'http://localhost:3000/expense';

  constructor( private http: HttpClient, private authService: AuthService ) {

    }

  getExpenses(): Observable<Model[]> {
    const userEmail = this.authService.getUserEmail();
    if (!userEmail) return of([]);
    const url = `${this.baseUrl}?userEmail=${userEmail}`;
    return this.http.get<Model[]>(url);
  }

  addExpense(expense: Model): Observable<Model> {
    const userEmail = this.authService.getUserEmail();
    const newExpense = { ...expense, userEmail };
    return this.http.post<Model>(this.baseUrl, newExpense);
  }

  updateExpense(id: number, expense: Model): Observable<Model> {
    const userEmail = this.authService.getUserEmail();
    const updatedExpense = { ...expense, userEmail };
    return this.http.put<Model>(`${this.baseUrl}/${id}`, updatedExpense);
  }

  deleteExpense(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
