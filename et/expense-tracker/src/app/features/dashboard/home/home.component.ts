import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ChartOptions, ChartData } from 'chart.js';
import { Router } from '@angular/router';

import { Model } from '../../expense/model';
import { ExpenseService } from '../../../core/services/expense.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor(
    private expenseService: ExpenseService,
    private router: Router
  ) {}

  totalAllTimeAmount: number = 0;
  paidCount = 0;
  failedCount = 0;
  allExpenses: Model[] = [];

  // Pie Chart
  selectedYearPie: string = 'all';
  selectedMonthPie: string = 'all';
  availableMonths: { value: string; label: string }[] = [];
  availableYears: string[] = [];
  pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: []
    }]
  };
  allTimePieLabels: string[] = [];
  allTimePieData: number[] = [];

  // Bar Chart
  selectedYearBar: string = 'all';
  selectedMonthBar: string = 'all';
  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{ label: 'Daily Expenses', data: [] }]
  };

  months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];

  dataSource = new MatTableDataSource<Model>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: 'white', font: { size: 12, weight: 'bold' } }
      },
      tooltip: {
        callbacks: { label: (context) => `₹${context.raw}` }
      }
    }
  };

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: { label: (context) => `₹${context.raw}` }
      }
    },
    layout: { padding: { top: 5, bottom: 5, left: 5, right: 5 } },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
          color: 'white',
          font: { size: 18 }
        },
        ticks: {
          color: 'white',
          font: { size: 14, weight: 'bold' },
          autoSkip: false,
          maxRotation: 70,
          minRotation: 0
        },
        grid: { display: false }
      },
      y: {
        title: {
          display: true,
          text: 'Expenses',
          color: 'white',
          font: { size: 20 }
        },
        min: 0,
        ticks: {
          color: 'white',
          font: { size: 16 },
          callback: (value) => `₹${value}`,
          stepSize: 200
        },
        grid: { color: 'rgba(255,255,255,0.1)' }
      }
    }
  };

  ngOnInit(): void {
    this.loadExpenses();
    this.dataSource.filterPredicate = (data: Model, filter: string): boolean =>
      data.title.toLowerCase().includes(filter);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.sort.active = 'date';
    this.sort.direction = 'desc';
    this.sort.sortChange.emit({ active: this.sort.active, direction: this.sort.direction });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  loadExpenses(): void {
    this.expenseService.getExpenses().subscribe({
      next: (expenses) => {
        this.allExpenses = expenses;
        this.dataSource.data = expenses;
        this.totalAllTimeAmount = expenses.filter(exp => exp.status === 'Paid')
          .reduce((sum, exp) => sum + exp.amount, 0);

        const monthsSet = new Set<string>();
        const yearsSet = new Set<string>();
        expenses.forEach(exp => {
          const date = new Date(exp.date);
          const month = date.toISOString().slice(0, 7);
          monthsSet.add(month);
          yearsSet.add(date.getFullYear().toString());
        });

        this.availableYears = Array.from(yearsSet).sort();
        this.availableMonths = this.months;

        this.selectedMonthBar = 'all';
        this.selectedMonthPie = 'all';
        this.selectedYearPie = 'all';

        this.onPieSelectionChange();
        this.onBarSelectionChange();

        this.paidCount = expenses.filter(e => e.status === 'Paid').length;
        this.failedCount = expenses.filter(e => e.status === 'Unpaid').length;

        // All-time summary
        const categoryMap: { [key: string]: number } = {};
        for (const exp of expenses) {
          const category = exp.category || 'Unknown';
          categoryMap[category] = (categoryMap[category] || 0) + exp.amount;
        }
        this.allTimePieLabels = Object.keys(categoryMap);
        this.allTimePieData = Object.values(categoryMap);
      },
      error: (err) => console.error('Failed to load expenses:', err)
    });
  }

  onPieSelectionChange(): void {
    const filtered = this.allExpenses.filter(exp => {
      const date = new Date(exp.date);
      const year = date.getFullYear().toString();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');

      const matchYear = this.selectedYearPie === 'all' || year === this.selectedYearPie;
      const matchMonth = this.selectedMonthPie === 'all' || month === this.selectedMonthPie;

      return matchYear && matchMonth;
    });

    this.preparePieChart(filtered);
  }

  onBarSelectionChange(): void {
    const filtered = this.allExpenses.filter(exp => {
      const date = new Date(exp.date);
      const year = date.getFullYear().toString();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');

      const matchYear = this.selectedYearBar === 'all' || year === this.selectedYearBar;
      const matchMonth = this.selectedMonthBar === 'all' || month === this.selectedMonthBar;

      return matchYear && matchMonth;
    });

    this.prepareBarChart(filtered);
  }

  preparePieChart(expenses: Model[]): void {
    if (expenses.length === 0) {
      this.pieChartData = {
        labels: ['No Data'],
        datasets: [{
          data: [0],
          backgroundColor: ['rgba(200,200,200,0.5)']
        }]
      };
      return;
    }

    const categoryMap: { [key: string]: number } = {};
    for (const expense of expenses) {
      const category = expense.category || 'Unknown';
      categoryMap[category] = (categoryMap[category] || 0) + expense.amount;
    }

    const labels = Object.keys(categoryMap);
    const data = Object.values(categoryMap);
    const colors = labels.map(() => this.getRandomColor());

    this.pieChartData = {
      labels,
      datasets: [{
        data,
        backgroundColor: colors,
        borderColor: colors.map(c => this.darkenColor(c, 0.8)),
        borderWidth: 1
      }]
    };
  }

  prepareBarChart(expenses: Model[]): void {
    if (expenses.length === 0) {
      this.barChartData = {
        labels: ['No Data'],
        datasets: [{
          label: 'Expenses',
          data: [0],
          backgroundColor: ['rgba(200,200,200,0.5)'],
          borderColor: ['rgba(200,200,200,1)'],
          borderWidth: 1
        }]
      };
      return;
    }

    const isAllTime = this.selectedYearBar === 'all';
    const isYearOnly = this.selectedYearBar !== 'all' && this.selectedMonthBar === 'all';

    const aggregationMap: { [key: string]: number } = {};
    for (const expense of expenses) {
      const dateObj = new Date(expense.date);
      const key = isAllTime
        ? dateObj.toLocaleString('default', { month: 'short', year: 'numeric' })
        : isYearOnly
          ? dateObj.toLocaleString('default', { month: 'short' })
          : dateObj.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });

      aggregationMap[key] = (aggregationMap[key] || 0) + expense.amount;
    }

    const sortedEntries = Object.entries(aggregationMap).sort(([a], [b]) => {
      const parseDate = (label: string) =>
        isAllTime ? new Date(label + ' 01') : new Date('2025 ' + label);
      return parseDate(a).getTime() - parseDate(b).getTime();
    });

    const labels = sortedEntries.map(([label]) => label);
    const data = sortedEntries.map(([, amount]) => amount);

    const colorPalette = [
      'rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)',
      'rgba(199, 199, 199, 0.2)', 'rgba(83, 102, 255, 0.2)',
      'rgba(64, 159, 255, 0.2)', 'rgba(255, 99, 255, 0.2)'
    ];

    const label =
      isAllTime
        ? 'Monthly Expenses (All Time)'
        : isYearOnly
          ? `Monthly Expenses (${this.selectedYearBar})`
          : `Daily Expenses (${this.getMonthLabel(this.selectedMonthBar)} ${this.selectedYearBar})`;

    this.barChartData = {
      labels,
      datasets: [{
        label,
        data,
        backgroundColor: colorPalette.slice(0, labels.length),
        borderColor: colorPalette.slice(0, labels.length).map(c => c.replace('0.2', '1')),
        borderWidth: 1
      }]
    };
  }

  getRandomColor(): string {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 0.7)`;
  }

  darkenColor(color: string, factor: number = 0.8): string {
    const rgba = color.match(/\d+/g);
    if (!rgba || rgba.length < 3) return color;
    const [r, g, b] = rgba.map(Number);
    return `rgba(${Math.floor(r * factor)}, ${Math.floor(g * factor)}, ${Math.floor(b * factor)}, 1)`;
  }

  getMonthLabel(month: string): string {
    const m = this.months.find(m => m.value === month);
    return m ? m.label : month;
  }
}
