import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.components.scss'],
})
export class ModalComponent {
  @Input() public title!: string;
  @Output() public isOpen: EventEmitter<boolean> = new EventEmitter<boolean>(
    true,
  );

  constructor(private modalService: ModalService) {}

  public closeModalWindow(): void {
    this.modalService.close();
    this.isOpen.emit(false);
  }
}
