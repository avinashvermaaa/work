import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
// import { AppRoutingModule } from '../../app-routing.module';

// components
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    // AppRoutingModule,
    DashboardRoutingModule
  ],
    exports: [HomeComponent] 

})
export class DashboardModule {
        constructor() {
    console.log('🌟 DashboardModule loaded');
  }
}
