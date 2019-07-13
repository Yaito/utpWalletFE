import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

import { SecurityResultComponent } from '../security-result/security-result.component';
import { ArduinoService } from '../arduino.service';
import {SnotifyService} from 'ng-snotify';
@Component({
  selector: 'app-security-op',
  templateUrl: './security-op.component.html',
  styleUrls: ['./security-op.component.scss']
})
export class SecurityOpComponent implements OnInit {

  @Input() cardID: number; // test id for security functions

  constructor(
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private arduinoService: ArduinoService,
    private snotifyService: SnotifyService
  ) { }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 200);
  }

  openModal() {
    this.spinner.show();
    this.arduinoService.read()
    .subscribe(response => {
      console.log(response);
      const aux = response.user_ID;
      const modalRef = this.modalService.open(SecurityResultComponent, { size: 'lg' });
      modalRef.componentInstance.cardID = aux;
      // modalRef.componentInstance.cardID = this.cardID;
      this.spinner.hide();
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
    }
    );
    // modalRef.componentInstance.userType = this.user.userType;
  }

  // test for keyup id value
  testInput() {
    console.log(this.cardID);
  }

  // runArduino() {
  //   let aux;
  //   this.arduinoService.read()
  //   .subscribe(response => {
  //     aux = response.user_ID;
  //     console.log(aux);
  //   });
  //   return aux;
  // }

}
