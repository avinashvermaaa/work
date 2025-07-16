import { Component, ViewChild, OnInit} from '@angular/core';
import { Model } from '../../expense/model';
import { ExpenseService } from '../../../core/services/expense.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { MatSort } from '@angular/material/sort';
import { ChartOptions,ChartData  } from 'chart.js';
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

    // Pie Chart 
    pieChartLabels: string[] = [];
    pieChartData: number[] = [];

    pieChartOptions: ChartOptions<'pie'> = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          labels: { color: 'white', font: { size: 12, weight: 'bold' }}
        }
      }
    };  

    // Bar Chart 
    barChartOptions: ChartOptions<'bar'> = {
      responsive: true,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: (context) => `₹${context.raw}`
          }
        }
      },
      scales: {
        x: {
          title: { display: true, text: 'Date', color : 'white' },
          ticks: { color: 'white', font: { size: 9,  }
      }
        },

      y: {
        type: 'linear',
        title: { display: true, text: 'Total Expense', color : 'white' },
        min: 100,
        max: 2000,
        ticks: {
          color: 'white', font: { size: 9, },
          callback: (value) => `₹${value}`,
          stepSize: 200,
        }
      }
      }
    };

    barChartData: ChartData<'bar'> = {
      labels: [],
      datasets: [
        {
          label: 'Daily Expenses',
          data: [],
          backgroundColor: 'white',
        }
      ]
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
        this.prepareBarChart(expenses); 

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

  prepareBarChart(expenses: Model[]): void {
  const dailyTotals: { [date: string]: number } = {};

  for (const expense of expenses) {
    const date = new Date(expense.date).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short'
    });

    dailyTotals[date] = (dailyTotals[date] || 0) + expense.amount;
  }

  this.barChartData.labels = Object.keys(dailyTotals);
  this.barChartData.datasets[0].data = Object.values(dailyTotals);
}


}
