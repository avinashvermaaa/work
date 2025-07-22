import { Component } from '@angular/core';

@Component({
  selector: 'app-expense-summary',
  templateUrl: './expense-summary.component.html',
  styleUrls: ['./expense-summary.component.css'],
})
export class ExpenseSummaryComponent {
  // Your data and logic for expense summary can go here
  expenseDetails = {
    date : '07/21/2025',
    title: 'Groceries',
    amount: 500,
    category: 'Food',
    payment: 'Credit Card',
    status: 'Completed',
    notes: 'Bought groceries for the week',
    receipt: 'https://path-to-receipt.com',
  };
}
