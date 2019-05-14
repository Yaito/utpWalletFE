import { Component, OnInit } from '@angular/core';
import { UserinfoService } from 'src/app/userinfo.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  initials: string;
  constructor(private userInfoServices: UserinfoService) { }

  ngOnInit() {
    this.userInfoServices.getInitials()
    .subscribe(res => {
      this.initials = res;
      // console.log(res);
    });
  }

}
