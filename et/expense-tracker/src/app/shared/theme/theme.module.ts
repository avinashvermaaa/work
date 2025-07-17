import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeRoutingModule } from './theme-routing.moudle'
import { SharedModule } from '../shared.module';
import { ThemePickerComponent } from './theme-picker/theme-picker.component'; 

import { FormsModule } from '@angular/forms';

import {  MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    ThemePickerComponent
  ],
  imports: [
    CommonModule,
    ThemeRoutingModule,
    SharedModule,
    FormsModule,

    MatTableModule,MatPaginatorModule,MatSnackBarModule,
    MatIconModule
  ]
})
export class ThemeModule { }
