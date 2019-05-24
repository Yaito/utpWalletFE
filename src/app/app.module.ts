import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { TransactionOpComponent } from './transaction-op/transaction-op.component';
import { SecurityOpComponent } from './security-op/security-op.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';

import { TransactionsComponent } from './transactions/transactions.component';
import { HelpComponent } from './help/help.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { SecurityResultComponent } from './security-result/security-result.component';
import { AlertComponent } from './_alert/alert.component';

import { AuthService } from './auth.service';
import { UserinfoService } from './userinfo.service';

import { ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccountComponent,
    TransactionOpComponent,
    SecurityOpComponent,
    HomeComponent,
    AboutUsComponent,
    TransactionsComponent,
    NavbarComponent,
    HelpComponent,
    SecurityResultComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      // {
      //   path: 'login',
      //   component: LoginComponent
      // },
      // {
      //   path: 'account',
      //   component: AccountComponent
      // },
      // {
      //   path: 'security',
      //   component: SecurityOpComponent
      // },
      // {
      //   path: 'transaction',
      //   component: TransactionOpComponent
      // },
      // {
      //   path: '',
      //   component: HomeComponent
      // }
    ]),
    NgbModalModule
  ],
  entryComponents: [
    AboutUsComponent,
    HelpComponent,
    SecurityResultComponent
  ],
  providers: [
    AuthService,
    UserinfoService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
