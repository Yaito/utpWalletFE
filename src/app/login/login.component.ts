import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AboutUsComponent } from '../about-us/about-us.component';
import { HelpComponent } from '../help/help.component';

import { AlertService } from '../alert.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  logo = 'assets/Logo.png';

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private alertService: AlertService,
    private modalService: NgbModal
    ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.spinner.show();

    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.spinner.hide();
          this.router.navigate(['/account']);
          // this.router.navigate([this.returnUrl]); // this is use to go back to previous page after login
        },
        error => {
          this.spinner.hide();
          this.alertService.error(error);
          this.loading = false;
        });
  }

  openUS() {
    const modalRef = this.modalService.open(AboutUsComponent, { size: 'lg' });
  }

  openHP() {
    const modalRef = this.modalService.open(HelpComponent, { centered: true });
  }

}
