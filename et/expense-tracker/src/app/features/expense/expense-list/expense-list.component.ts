import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';

import { Model } from '../model';
import { ExpenseService } from '../../../core/services/expense.service';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExpenseDialogComponent } from '../expense-dialog/expense-dialog.component';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = [
    'date', 'title', 'amount', 'category',
    'payment', 'status', 'notes', 'receipt', 'actions'
  ];

  dataSource = new MatTableDataSource<Model>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private expenseService: ExpenseService,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
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
      error: (err) => console.error('Failed to load expenses:', err)
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(ExpenseDialogComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.expenseService.addExpense(result).subscribe(() => {
          this.loadExpenses();
          this.snackBar.open('Expense added successfully', 'Close', { duration: 3000 });
        });
      }
    });
  }

  onEdit(expense: Model): void {
    const dialogRef = this.dialog.open(ExpenseDialogComponent, {
      width: '600px',
      data: { ...expense }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updated = { ...expense, ...result };
        this.expenseService.updateExpense(updated.id, updated).subscribe(() => {
          this.loadExpenses();
          console.log('Expense updated:', updated);
          this.snackBar.open('Expense updated successfully', 'Close', { duration: 3000 });
        });
      }
    });
  }

  onDelete(expense: Model): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        message: `Are you sure you want to delete the Expense: "${expense.title}"?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.expenseService.deleteExpense(expense.id).subscribe({
          next: () => {
            this.loadExpenses();
            console.log('Deleted:', expense.id);
            this.snackBar.open('Expense deleted successfully', 'Close', { duration: 3000 });
          },
          error: (err) => {
            console.error('Delete failed:', err);
            this.snackBar.open('Failed to delete expense', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
}
