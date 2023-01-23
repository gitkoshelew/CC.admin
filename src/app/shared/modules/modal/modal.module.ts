import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';

import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  imports: [CommonModule, NzModalModule],
  declarations: [ModalComponent],
  exports: [ModalComponent],
})
export class ModalModule {}
