    import { NgModule } from '@angular/core';
    import { RouterModule, Routes } from '@angular/router';
    import { ThemePickerComponent } from './theme-picker/theme-picker.component'; // Example component

    const routes: Routes = [
      { path: '', component: ThemePickerComponent }
    ];

    @NgModule({
      imports: [RouterModule.forChild(routes)], // Use forChild for feature modules
      exports: [RouterModule]
    })
    export class ThemeRoutingModule { }