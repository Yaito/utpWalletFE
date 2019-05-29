import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

import { AlertService } from '../alert.service';
import { RegisterForm } from 'src/assets/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  registration: RegisterForm;
  selectedUsertype; // for dropdown element

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      personal_ID: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      usertype: ['', Validators.required],
      acc_faculty: ['', Validators.required],
      acc_career: ['', Validators.required]
    });

  }

  get f() { return this.registerForm.controls; }

  selectChangeHandler(event: any) {
    this.selectedUsertype = +event.target.value;
    console.log(this.selectedUsertype);
    console.log(typeof (this.selectedUsertype));
    // this.registration.usertype = this.selectedUsertype;
  }

  onSubmit() {
    // this.spinner.show()
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    // Create the Register services first
    // this.userService.register(this.registerForm.value)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       this.spinner.hide()
    //       this.alertService.success('Registration successful', true);
    //       this.router.navigate(['/login']);
    //     },
    //     error => {
    //       this.alertService.error(error);
    //       this.spinner.hide()
    //     });
  }

}
