import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

import { RegisterService } from '../register.service';
import { AlertService } from '../alert.service';
import { University, Career, Faculty, RoleType } from 'src/assets/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  careers: Career[]; // object received from the previous component
  faculties: Faculty[]; // object received from the previous component
  roleTypes: RoleType[]; // object received from the previous component

  selectedUsertype; // for dropdown element

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private registerService: RegisterService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      usertype: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      personal_ID: ['', Validators.required],
      acc_faculty: [''],
      acc_career: [null]
    });
    this.setUserCategoryValidators();
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.spinner.show();
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this.spinner.hide();
      return;
    }
    this.registerService.registerUser(
      this.f.username.value,
      this.f.password.value,
      this.f.usertype.value
    )
      .pipe(first())
      .subscribe(
        data => {
          this.registerService.registerAccount(
            data.user_ID,
            this.f.first_name.value,
            this.f.last_name.value,
            this.f.personal_ID.value,
            this.f.acc_faculty.value,
            this.f.acc_career.value,
            this.f.usertype.value
          )
          .pipe(first())
          .subscribe(
            newUser => {
              console.log(newUser);
              this.spinner.hide();
              this.alertService.success('Información Registrado', true);
            },
            error => {
              this.spinner.hide();
              this.alertService.error(error);
            });
          this.spinner.hide();
          this.alertService.success('Usuario Registrado', true);
        },
        error => {
          this.spinner.hide();
          this.alertService.error(error);
        });
  }

  typeSelected() {
    // storage the selected usertype for conditional fields
    this.selectedUsertype = this.registerForm.value.usertype;
    console.log(this.registerForm.value);
  }

  setUserCategoryValidators() {
    // validators update by usertype change on template
    const facultyControl = this.registerForm.get('acc_faculty');
    const careerControl = this.registerForm.get('acc_career');

    this.registerForm.get('usertype').valueChanges
      .subscribe(usertype => {

        if (usertype === 0) {
          facultyControl.setValidators([Validators.required]);
          careerControl.setValidators([Validators.required]);
        }

        if (usertype !== 0) {
          facultyControl.setValidators(null);
          careerControl.setValidators(null);
        }

        facultyControl.updateValueAndValidity();
        careerControl.updateValueAndValidity();
      });
  }

}
