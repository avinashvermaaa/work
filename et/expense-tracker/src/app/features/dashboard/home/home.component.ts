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

    displayedColumns: string[] = ['date','title', 'amount', 'category'];
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
  maintainAspectRatio: false,  
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (context) => `₹${context.raw}`
      }
    }
  },
  layout: {
    padding: {
      top: 10,
      bottom: 10,
      left: 15,
      right: 15
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Date',
        color: 'white',
        font : {size : 16}
      },
      ticks: {
        color: 'white',
        font: {
          size: 16,
          weight: 'bold'
        },
        autoSkip: false,
        maxRotation: 50,
        minRotation: 0
      },
      grid: {
        display: false
      }
    },
    y: {
      title: {
        display: true,
        text: 'Total Expenses',
        color: 'white',
        font : {size : 20}
      },
      min: 0,
      ticks: {
        color: 'white',
        font: {
          size: 16,
        },
        callback: (value) => `₹${value}`,
        stepSize: 200
      },
      grid: {
        color: 'rgba(255,255,255,0.1)'
      }
    }
  }
};


    barChartData: ChartData<'bar'> = {
      labels: [],
      datasets: [ {
          label: 'Daily Expenses',
          data: []
          // backgroundColor: 'rgb(218, 209, 209)',
        } ]
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

      // this.barChartData.labels = Object.keys(dailyTotals);
      // this.barChartData.datasets[0].data = Object.values(dailyTotals);
      console.log('Bar Chart Labels:', this.barChartData.labels);
      console.log('Bar Chart Data:', this.barChartData.datasets[0].data);

    const colorPalette = [
        'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)','rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'
    ];

      this.barChartData = {
      labels: Object.keys(dailyTotals),
      datasets: [ {
          label: 'Daily Expenses',
          data: Object.values(dailyTotals),
            backgroundColor: colorPalette.slice(0, Object.keys(dailyTotals).length),
            borderColor: colorPalette.slice(0, Object.keys(dailyTotals).length).map(color => color.replace('0.2', '1')),
            borderWidth: 1
        } ]
    };

  }


}
