import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SecurityResultComponent } from '../security-result/security-result.component';

@Component({
  selector: 'app-security-op',
  templateUrl: './security-op.component.html',
  styleUrls: ['./security-op.component.scss']
})
export class SecurityOpComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit() {

  }

  showInfo() {
    const modalRef = this.modalService.open(SecurityResultComponent, { size: 'lg' });
  }

}
