import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent {

  helpMessage = `
  Bienvenido al Portal de UTPWallet, si tiene algún problema para acceder a su perfil, contacte con secretaria académica de su
  facultad para más información respecto al tema.`;

  constructor(public activeModal: NgbActiveModal) { }

}
