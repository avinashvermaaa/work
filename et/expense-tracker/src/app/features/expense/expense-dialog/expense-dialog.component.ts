import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Model } from '../model';

@Component({
  selector: 'app-expense-dialog',
  templateUrl: './expense-dialog.component.html',
  styleUrls: ['./expense-dialog.component.scss']
})
export class ExpenseDialogComponent implements OnInit {
  form!: FormGroup;
  currentStep = 0;
  steps: string[] = ['Basic Info', 'Timing & Status', 'Notes & Receipt', 'Summary'];

  categoryOptions: string[] = ['Food', 'Travel', 'Health', 'Entertainment','Shopping',  'Bills', 'Other'];
  paymentOptions: string[] = ['Cash', 'Card', 'Crypto', 'UPI', 'Net Banking', 'Other'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ExpenseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Model | null
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [this.data?.title || '', [Validators.required, Validators.maxLength(20), Validators.pattern(/^\S+[\s\S]*$/)]],
      amount: [this.data?.amount || '', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.min(1), Validators.max(1000000000)]],
      category: [this.data?.category || '', [Validators.required]],
      payment: [this.data?.payment || '', [Validators.required]],
      date: [this.data?.date || '', [Validators.required]],
      status: [this.data?.status || '', [Validators.required]],
      notes: [this.data?.notes || '', [Validators.required, Validators.maxLength(30), Validators.pattern(/^\S+[\s\S]*$/)]],
      receipt: [this.data?.receipt || '', [Validators.required, Validators.maxLength(55), Validators.pattern("((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)")]]
    });
  }

  get controls() {
    return this.form.controls;
  }

  showError(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  validateStep(stepIndex: number): boolean {
    switch (stepIndex) {
      case 0:
        return !!(this.form.get('title')?.valid && this.form.get('amount')?.valid && this.form.get('category')?.valid && this.form.get('payment')?.valid);
      case 1:
        return !!(this.form.get('date')?.valid && this.form.get('status')?.valid);
      case 2:
        return !!(this.form.get('notes')?.valid && this.form.get('receipt')?.valid);
      default:
        return true;
    }
  }

  nextStep(): void {
    if (this.validateStep(this.currentStep)) {
      this.currentStep++;
    } else {
      this.form.markAllAsTouched();
    }
  }

  prevStep(): void {
    this.currentStep--;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.form.valid) {
      const expense: Model = this.form.value;
      this.dialogRef.close(expense);
    }
  }
}
