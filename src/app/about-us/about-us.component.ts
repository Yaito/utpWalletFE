import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {
  aboutMessage = `
  Bienvenidos al portal de UTPWallet, un sistema de identificación, administración y manejo de transacciones
  dentro de la institución de la Universidad Tecnológica de Panamá, este es un proyecto prototipo creado
  para la tesis de los estudiantes: Luis Yao y Roderick Mastrolinardo de la Facultad de Ingeniería en Sistemas y Computación.
  `;

  constructor(public activeModal: NgbActiveModal) { }

}
