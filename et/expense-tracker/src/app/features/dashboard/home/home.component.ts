import { Component, ViewChild, OnInit} from '@angular/core';
import { Model } from '../../expense/model';
import { ExpenseService } from '../../../core/services/expense.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { MatSort } from '@angular/material/sort';
import { ChartOptions } from 'chart.js';
// import { Label } from 'ng2-charts';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

    constructor(private expenseService: ExpenseService) {
      console.log('🌟 HomeComponent loaded');
    }

    displayedColumns: string[] = ['date','title', 'amount', 'category', 'payment', 'status','notes'];
    dataSource = new MatTableDataSource<Model>();
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    // Pie Chart Properties
    pieChartLabels: string[] = [];
    pieChartData: number[] = [];

    pieChartOptions: ChartOptions<'pie'> = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        }
      }
    };  

    
  ngOnInit(): void {
    this.loadExpenses();
  }


  loadExpenses(): void {
    this.expenseService.getExpenses().subscribe({
      next: (expenses) => {
        this.dataSource.data = expenses;
        this.dataSource.paginator = this.paginator; 
        this.dataSource.sort = this.sort;
        this.preparePieChart(expenses);
      },
      error: (err) => console.error('Failed to load expenses:', err)
    });
  }

  preparePieChart(expenses: Model[]): void {
    const categoryMap: { [key: string]: number } = {};

    for (const expense of expenses) {
      const category = expense.category || 'Unknown';
      categoryMap[category] = (categoryMap[category] || 0) + expense.amount;
    }

    this.pieChartLabels = Object.keys(categoryMap);
    this.pieChartData = Object.values(categoryMap);
  }

}
