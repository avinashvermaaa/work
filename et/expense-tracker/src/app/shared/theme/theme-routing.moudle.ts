    import { NgModule } from '@angular/core';
    import { RouterModule, Routes } from '@angular/router';
    import { ThemePickerComponent } from './theme-picker/theme-picker.component'; 

    const routes: Routes = [
      { path: '', component: ThemePickerComponent }
    ];

    @NgModule({
      imports: [RouterModule.forChild(routes)], 
      exports: [RouterModule]
    })
    export class ThemeRoutingModule { }