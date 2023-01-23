import { Component, Input } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.components.scss'],
})
export class ModalComponent {
  @Input() title!: string;

  constructor(public modalService: ModalService) {}
}
