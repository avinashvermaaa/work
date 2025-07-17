import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Model } from '../model';
import { ExpenseService } from '../../../core/services/expense.service';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';


@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})

export class ExpenseListComponent {

    constructor(private expenseService: ExpenseService, private _liveAnnouncer: LiveAnnouncer) {
      console.log('🌟 Expense-List-Component loaded');
    }

    displayedColumns: string[] = ['date','title', 'amount', 'category', 'payment', 'status','notes','receipt'];
    dataSource = new MatTableDataSource<Model>();

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    ngOnInit(): void {
      this.loadExpenses();
    }
    
    ngAfterViewInit() {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
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

    sortData( sortState: Sort){
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
    }
}
