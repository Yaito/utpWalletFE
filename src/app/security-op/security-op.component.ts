import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

import { SecurityResultComponent } from '../security-result/security-result.component';

@Component({
  selector: 'app-security-op',
  templateUrl: './security-op.component.html',
  styleUrls: ['./security-op.component.scss']
})
export class SecurityOpComponent implements OnInit {

  public user = {
    cardID: 1, // test id for security functions
    userType: 0 // test type for security functions
  };

  constructor(
    private modalService: NgbModal,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 200);
  }

  openModal() {
    const modalRef = this.modalService.open(SecurityResultComponent, { size: 'lg' });
    modalRef.componentInstance.cardID = this.user.cardID;
    modalRef.componentInstance.userType = this.user.userType;
  }

  // test for keyup id value
  testInput() {
    console.log(this.user.cardID, this.user.userType);
  }

}
