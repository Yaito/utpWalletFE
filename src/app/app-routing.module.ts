import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { TransactionOpComponent } from './transaction-op/transaction-op.component';
import { SecurityOpComponent } from './security-op/security-op.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_auth-guard/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'security', component: SecurityOpComponent },
  { path: 'transaction', component: TransactionOpComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

// export const routing = RouterModule.forRoot(routes);
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
