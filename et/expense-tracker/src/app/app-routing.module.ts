import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'expense',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./features/expense/expense.module').then(m => m.ExpenseModule)
  },
  {
    path: 'theme',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./shared/theme/theme.module').then(m => m.ThemeModule)
  },
  { 
    path : '', 
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
    pathMatch: 'prefix'
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking', onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
