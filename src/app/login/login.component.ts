import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AboutUsComponent } from '../about-us/about-us.component';
import { HelpComponent } from '../help/help.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logo = 'assets/Logo.png';

  username;
  password;

  constructor(private Auth: AuthService, private modalService: NgbModal) { }

  ngOnInit() {
  }

  openUS() {
    const modalRef = this.modalService.open(AboutUsComponent, { size: 'lg' });
  }

  openHP() {
    const modalRef = this.modalService.open(HelpComponent, { centered: true });
  }

  loginUser() {
    event.preventDefault();
    this.Auth.getUserDetails(this.username, this.password);
    console.log(this.username, this.password);
  }

}
