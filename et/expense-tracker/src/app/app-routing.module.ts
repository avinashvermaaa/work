import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
  },

  { 
    path : '', 
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
    pathMatch: 'prefix'
  }
  // { path : '**', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),pathMatch: 'prefix'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
