import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-recharge-modal',
  templateUrl: './recharge-modal.component.html',
  styleUrls: ['./recharge-modal.component.scss']
})
export class RechargeModalComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
  }

}
