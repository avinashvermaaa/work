import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeRoutingModule } from './theme-routing.moudle'
import { SharedModule } from '../shared.module';
import { ThemePickerComponent } from './theme-picker/theme-picker.component'; 

import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ThemePickerComponent
  ],
  imports: [
    CommonModule,
    ThemeRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ThemeModule { }
