import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterHeaderComponent } from './footer-header/footer-header.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    FooterHeaderComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
