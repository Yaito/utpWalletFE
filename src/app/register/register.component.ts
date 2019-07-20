import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

import { RegisterService } from '../register.service';
import { AlertService } from '../alert.service';
import { ArduinoService } from '../arduino.service';
import { Career, Faculty, RoleType } from 'src/assets/models';
import {SnotifyService} from 'ng-snotify';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  cardReady = false;

  careers: Career[]; // object received from the previous component
  faculties: Faculty[]; // object received from the previous component
  roleTypes: RoleType[]; // object received from the previous component

  selectedUsertype; // for dropdown element
  newcardID; // for new card

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private registerService: RegisterService,
    private arduinoService: ArduinoService,
    private snotifyService: SnotifyService
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
    // register account username and password
    this.registerService.registerUser(
      this.f.username.value,
      this.f.password.value,
      this.f.usertype.value
    )
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          // write the cardID into the NFC card
          // this.writeCard(data.user_ID);
          // register account information
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
                // this.alertService.success('Información Registrado', true);
                this.snotifyService.info('Información Registrado.', 'Registrar', {
                  timeout: 5000,
                  showProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  position: 'rightTop',
                  icon: '/assets/Logo_RAW.png'
                });
                // this.activeModal.close();
              },
              error => {
                this.spinner.hide();
                // this.alertService.error(error);
                this.snotifyService.error(error, 'Error', {
                  timeout: 5000,
                  showProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  position: 'rightTop',
                  icon: '/assets/Logo_RAW.png'
                });
                this.activeModal.close();
              });
          this.spinner.hide();
          ///////
          this.cardReady = !this.cardReady;
          this.newcardID = data.user_ID;
          ///////
          // this.alertService.success('Usuario Registrado', true);
          this.snotifyService.info('Usuario Creado.', 'Registrar', {
            timeout: 5000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            position: 'rightTop',
            icon: '/assets/Logo_RAW.png'
          });
          // this.activeModal.close();
        }
        ,
        error => {
          this.spinner.hide();
          this.snotifyService.error(error, 'Error', {
            timeout: 5000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            position: 'rightTop',
            icon: '/assets/Logo_RAW.png'
          });
          this.activeModal.close();
        }
        );
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

  writeCard(newcardID) {
    this.spinner.show();
    // write the cardID into the NFC card
    this.arduinoService.write(newcardID)
      .subscribe(response => {
        this.snotifyService.info('Tarjeta Creada.', 'Registrar', {
          timeout: 5000,
          showProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          position: 'rightTop',
          icon: '/assets/Logo_RAW.png'
        });
        this.spinner.hide();
        this.activeModal.close();
      },
        error => {
          console.log(error);
          this.snotifyService.error(error, 'Error', {
            timeout: 5000,
            showProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            position: 'rightTop',
            icon: '/assets/Logo_RAW.png'
          });
          this.spinner.hide();
          this.activeModal.close();
        }
      );
  }

}
