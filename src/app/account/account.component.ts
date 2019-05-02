import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  fullname = 'Roderick Mastrolinardo';
  initials: string;

  accDetails =
    ['Facultad de Ingeniería Sistemas Computacionales',
      '8-888-9999',
      'Licenciatura en Ingeniería de Sistemas y Computación',
      'rodmastro@gmail.com'];

  constructor() {
  }

  ngOnInit() {
    this.getInitials(this.fullname);
  }

  getInitials(fullname) {
    let match = fullname.match(/\b(\w)/g);
    this.initials = match[0] + match[1];
    return this.initials;
  }

}
