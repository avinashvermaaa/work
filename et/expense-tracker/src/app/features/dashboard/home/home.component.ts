import { Component, ViewChild, OnInit} from '@angular/core';
import { Model } from '../../expense/model';
import { ExpenseService } from '../../../core/services/expense.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

    constructor(private expenseService: ExpenseService) {
      console.log('🌟 HomeComponent loaded');
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
