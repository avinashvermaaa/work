import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Model } from '../../features/expense/model';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private baseUrl = 'http://localhost:3000/expense';
  // localStorage.setItem('userEmail', response[0].email);

  constructor(private http: HttpClient) {}

  getExpenses(): Observable<Model[]> {
    return this.http.get<Model[]>(this.baseUrl);
  }

  addExpense(expense: Model): Observable<Model> {
    return this.http.post<Model>(this.baseUrl, expense);
  }

  deleteExpense(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  updateExpense(id: number, expense: Model): Observable<Model> {
    return this.http.put<Model>(`${this.baseUrl}/${id}`, expense);
  }
}
