import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Model } from '../../expense/model';
import { ExpenseService } from '../../../core/services/expense.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { ChartOptions, ChartData } from 'chart.js';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor(
    private expenseService: ExpenseService,
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router
  ) {}

  totalAllTimeAmount: number = 0;

  selectedMonth: string = '';
  availableMonths: { value: string; label: string }[] = [];
  allExpenses: Model[] = [];
selectedMonthPie: string = 'all';
selectedMonthBar: string = 'all';
onPieMonthChange(): void {
  const filtered = this.selectedMonthPie === 'all'
    ? this.allExpenses
    : this.allExpenses.filter(exp => new Date(exp.date).toISOString().slice(0, 7) === this.selectedMonthPie);

  this.preparePieChart(filtered);
}

onBarMonthChange(): void {
  const filtered = this.selectedMonthBar === 'all'
    ? this.allExpenses
    : this.allExpenses.filter(exp => new Date(exp.date).toISOString().slice(0, 7) === this.selectedMonthBar);

  this.prepareBarChart(filtered);
}

  paidCount = 0;
  failedCount = 0;

  allTimePieLabels: string[] = [];
  allTimePieData: number[] = [];

  // displayedColumns: string[] = ['date', 'title', 'amount', 'category'];
  dataSource = new MatTableDataSource<Model>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Pie Chart (Monthly)
  pieChartLabels: string[] = [];
  pieChartData: number[] = [];

  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white',
          font: { size: 12, weight: 'bold' }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => `₹${context.raw}`
        }
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
      padding: { top: 5, bottom: 5, left: 5, right: 5 }
    },
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
          text: this.selectedMonthBar === 'all' ? 'Total Monthly Expenses' : 'Total Daily Expenses',
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

  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{ label: 'Daily Expenses', data: [] }]
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

  expense(): void {
    this.router.navigate(['/expense']);
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
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.totalAllTimeAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);

        // Prepare month dropdown
        const monthsSet = new Set<string>();
        expenses.forEach(exp => {
          const month = new Date(exp.date).toISOString().slice(0, 7);
          monthsSet.add(month);
        });

this.availableMonths = [
  { value: 'all', label: 'All Time' },
  ...Array.from(monthsSet).sort().map(month => {
    const [year, monthNum] = month.split('-');
    const monthName = new Date(+year, +monthNum - 1).toLocaleString('default', { month: 'long' });
    return { value: month, label: `${monthName} ${year}` };
  })
];

this.selectedMonthPie = 'all';
this.selectedMonthBar = 'all';
this.onPieMonthChange();
this.onBarMonthChange();



        // Count paid and failed
        this.paidCount = expenses.filter(e => e.status === 'Paid').length;
        this.failedCount = expenses.filter(e => e.status === 'Unpaid').length;

        // All-time category pie
        const allTimeCategoryMap: { [key: string]: number } = {};
        for (const expense of expenses) {
          const category = expense.category || 'Unknown';
          allTimeCategoryMap[category] = (allTimeCategoryMap[category] || 0) + expense.amount;
        }
        this.allTimePieLabels = Object.keys(allTimeCategoryMap);
        this.allTimePieData = Object.values(allTimeCategoryMap);
      },
      error: (err) => console.error('Failed to load expenses:', err)
    });
  }

  onMonthChange(): void {
    this.updateChartsForMonth();
  }

updateChartsForMonth(): void {
  const filteredExpenses = this.selectedMonth === 'all'
    ? this.allExpenses
    : this.allExpenses.filter(exp => {
        const month = new Date(exp.date).toISOString().slice(0, 7);
        return month === this.selectedMonth;
      });

  this.preparePieChart(filteredExpenses);
  this.prepareBarChart(filteredExpenses);
}


  preparePieChart(expenses: Model[]): void {
    if (expenses.length === 0) {
      this.pieChartLabels = ['No Data'];
      this.pieChartData = [1];
      return;
    }

    const categoryMap: { [key: string]: number } = {};
    for (const expense of expenses) {
      const category = expense.category || 'Unknown';
      categoryMap[category] = (categoryMap[category] || 0) + expense.amount;
    }

    this.pieChartLabels = Object.keys(categoryMap);
    this.pieChartData = Object.values(categoryMap);
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

  const isAllTime = this.selectedMonthBar === 'all';

  const aggregationMap: { [key: string]: number } = {};
  for (const expense of expenses) {
    const dateObj = new Date(expense.date);
    const key = isAllTime
      ? dateObj.toLocaleString('default', { month: 'short', year: 'numeric' }) // eg. "Jul 2025"
      : dateObj.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }); // eg. "24 Jul"

    aggregationMap[key] = (aggregationMap[key] || 0) + expense.amount;
  }

  const sortedEntries = Object.entries(aggregationMap)
    .sort(([a], [b]) => {
      const parseDate = (label: string) =>
        isAllTime ? new Date(label + ' 01') : new Date('2025 ' + label); // Assuming year 2025 for sorting consistency
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

  this.barChartData = {
    labels,
    datasets: [{
      label: isAllTime ? 'Monthly Expenses' : 'Daily Expenses',
      data,
      backgroundColor: colorPalette.slice(0, labels.length),
      borderColor: colorPalette.slice(0, labels.length).map(c => c.replace('0.2', '1')),
      borderWidth: 1
    }]
  };
}


  sortData(sortState: Sort): void {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
