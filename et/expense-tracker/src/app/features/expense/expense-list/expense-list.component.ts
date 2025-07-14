import { Component } from '@angular/core';
import { Model } from '../model';
import { ExpenseService } from '../../../core/services/expense.service';

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
  dataSource : Model[] =[];

  ngOnInit(): void {
    this.loadExpenses();
  }

  loadExpenses(): void {
    this.expenseService.getExpenses().subscribe({
      next: (expenses) => this.dataSource = expenses,
      error: (err) => console.error('Failed to load expenses:', err)
    });
    
  }
}
