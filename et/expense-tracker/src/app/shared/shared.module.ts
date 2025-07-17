import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar'; 


import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { HighlightStatusDirective } from './directives/highlight-status.directive';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    HighlightStatusDirective
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule
  ],
    exports: [
    HeaderComponent,
    FooterComponent,
    HighlightStatusDirective
  ]
})
export class SharedModule { }
