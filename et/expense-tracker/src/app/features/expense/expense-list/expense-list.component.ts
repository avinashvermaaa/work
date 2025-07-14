import { Component, ViewChild, OnInit } from '@angular/core';
import { Model } from '../model';
import { ExpenseService } from '../../../core/services/expense.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})

export class ExpenseListComponent {

    constructor(private expenseService: ExpenseService) {
      console.log('🌟 Expense-List-Component loaded');
    }

  displayedColumns: string[] = ['title', 'amount', 'category', 'payment', 'status'];
    dataSource = new MatTableDataSource<Model>();

    @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.expenseService.getExpenses().subscribe({
      next: (expenses) => {
        this.dataSource.data = expenses;
        this.dataSource.paginator = this.paginator; 
      },
      error: (err) => console.error('Failed to load expenses:', err)
    });
  }
}
