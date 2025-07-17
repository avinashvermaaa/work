import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

import { Model } from '../model';
import { ExpenseService } from '../../../core/services/expense.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent  {

  displayedColumns: string[] = [
    'date', 'title', 'amount', 'category',
    'payment', 'status', 'notes', 'receipt','actions'
  ];

  onEdit(expense: Model): void {
    console.log('Edit clicked for:', expense);
  }

onDelete(expense: Model): void {
  const confirmDelete = confirm(`Are you sure you want to delete: ${expense.title}?`);
  if (confirmDelete) {
    this.expenseService.deleteExpense(expense.id).subscribe({
      next: () => {
        this.loadExpenses();
        console.log('Deleted:', expense.id);
      },
      error: (err) => console.error(' Delete failed:', err)
    });
  }
}



  dataSource = new MatTableDataSource<Model>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private expenseService: ExpenseService,
    private _liveAnnouncer: LiveAnnouncer
  ) {
    console.log('🌟 Expense-List-Component loaded');
  }

  ngOnInit(): void {
    this.loadExpenses();

    this.dataSource.filterPredicate = (data: Model, filter: string): boolean =>
      data.title.toLowerCase().includes(filter);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  sortData(sortState: Sort): void {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  loadExpenses(): void {
    this.expenseService.getExpenses().subscribe({
      next: (expenses) => {
        this.dataSource.data = expenses;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => console.error('❌ Failed to load expenses:', err)
    });
  }
}
