import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-expense-dialog',
  templateUrl: './expense-dialog.component.html',
  styleUrls: ['./expense-dialog.component.css']
})
export class ExpenseDialogComponent {
  currentTab = 0;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ExpenseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      title: [data?.title || '', Validators.required],
      amount: [data?.amount || '', [Validators.required, Validators.min(1)]],
      category: [data?.category || '', Validators.required],
      payment: [data?.payment || '', Validators.required],
      date: [data?.date || '', Validators.required],
      status: [data?.status || '', Validators.required],
      notes: [data?.notes || '', Validators.required],
      receipt: [data?.receipt || '', Validators.required],
    });
  }

  get controls(): { [key: string]: any } {
    return this.form.controls;
  }

  nextTab(): void {
    if (this.isTabValid(this.currentTab)) {
      this.currentTab++;
    }
  }

  prevTab(): void {
    if (this.currentTab > 0) {
      this.currentTab--;
    }
  }

  isTabValid(index: number): boolean {
    switch (index) {
      case 0:
        return this.controls['title'].valid &&
               this.controls['amount'].valid &&
               this.controls['category'].valid &&
               this.controls['payment'].valid;

      case 1:
        return this.controls['date'].valid &&
               this.controls['status'].valid;

      case 2:
        return this.controls['notes'].valid &&
               this.controls['receipt'].valid;

      default:
        return true;
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  getTabIcon(index: number): string {
    return this.isTabValid(index) ? 'check_circle' : 'error';
  }
}
