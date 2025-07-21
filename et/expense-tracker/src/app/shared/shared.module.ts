import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar'; 


import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { HighlightStatusDirective } from './directives/highlight-status.directive';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    HighlightStatusDirective,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,



        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTabsModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,
        MatPaginatorModule,
  ],
    exports: [
    HeaderComponent,
    FooterComponent,
    HighlightStatusDirective,
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
