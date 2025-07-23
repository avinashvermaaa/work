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
  submitted = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ExpenseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      title: [data?.title || '', [Validators.required, Validators.maxLength(20), Validators.pattern(/^\S+[\s\S]*$/)]],
      amount: [data?.amount || '', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.min(1), Validators.max(1000000000)]],
      category: [data?.category || '', [Validators.required]],
      payment: [data?.payment || '', [Validators.required]],
      date: [data?.date || '', [Validators.required]],
      status: [data?.status || '', [Validators.required]],
      notes: [data?.notes || '', [Validators.required, Validators.maxLength(30), Validators.pattern(/^\S+[\s\S]*$/)]],
      receipt: [data?.receipt || '', [Validators.required, Validators.maxLength(55), Validators.pattern("((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)")]]
    });
  }

  


  get controls(): { [key: string]: any } {
    return this.form.controls;
  }

  nextTab(): void {
    this.submitted = true;
    if (this.isTabValid(this.currentTab)) {
      this.currentTab++;
      this.submitted = false;
    } else {
      this.markFieldsTouched(this.currentTab);
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

  getTabIcon(index: number): string {
    return this.isTabValid(index) ? 'check_circle' : 'error';
  }

  showError(field: string): boolean {
    return (this.controls[field].touched || this.submitted) && this.controls[field].invalid;
  }

  markFieldsTouched(index: number): void {
    const fieldGroups: { [key: number]: string[] } = {
      0: ['title', 'amount', 'category', 'payment'],
      1: ['date', 'status'],
      2: ['notes', 'receipt'],
    };

    fieldGroups[index]?.forEach(field => {
      this.controls[field].markAsTouched();
    });
  }

  markAllFieldsTouched(): void {
    Object.values(this.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.submitted = true;
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    } else {
      this.markAllFieldsTouched();
    }
  }
}
