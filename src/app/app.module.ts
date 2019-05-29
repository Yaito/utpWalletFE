import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';
// Main Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { TransactionOpComponent } from './transaction-op/transaction-op.component';
import { SecurityOpComponent } from './security-op/security-op.component';
import { AdminComponent } from './admin/admin.component';
import { RegisterComponent } from './register/register.component';
// Support Components
import { NavbarComponent } from './navbar/navbar.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { AlertComponent } from './_alert/alert.component';
// Services
import { AuthService } from './auth.service';
import { UserinfoService } from './userinfo.service';
// Interceptors
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
// Modals Components
import { AboutUsComponent } from './about-us/about-us.component';
import { HelpComponent } from './help/help.component';
import { SecurityResultComponent } from './security-result/security-result.component';
import { RechargeModalComponent } from './recharge-modal/recharge-modal.component';
import { PaymentModalComponent } from './payment-modal/payment-modal.component';

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
    AlertComponent,
    AdminComponent,
    RechargeModalComponent,
    PaymentModalComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    NgbModalModule,
    NgxSpinnerModule
  ],
  entryComponents: [
    AboutUsComponent,
    HelpComponent,
    SecurityResultComponent,
    RechargeModalComponent,
    PaymentModalComponent,
    RegisterComponent
  ],
  providers: [
    AccountComponent,
    AuthService,
    UserinfoService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
