import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { FeatureFlagService } from '../../services/feature-flag.service';
import { ModalService } from '../../../shared/modules/modal/modal.service';

@Component({
  selector: 'app-edit-feature',
  templateUrl: './edit-feature.component.html',
  styleUrls: ['./edit-feature.component.scss'],
})
export class EditFeatureComponent implements OnInit {
  @Input() public id!: number;
  @Input() public title!: string;
  @Input() public description!: string;
  @Output() public isOpen: EventEmitter<boolean> = new EventEmitter<boolean>(
    true,
  );
  public validateFormEditFeature!: UntypedFormGroup;

  public submitForm(): void {
    if (this.validateFormEditFeature.valid) {
      this.featureFlagService.updateFeature(
        this.id,
        this.validateFormEditFeature.value,
      );
      this.modalService.close();
      this.isOpen.emit(false);
    } else {
      Object.values(this.validateFormEditFeature.controls).forEach(
        (control) => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        },
      );
    }
  }

  constructor(
    private fb: UntypedFormBuilder,
    private featureFlagService: FeatureFlagService,
    private modalService: ModalService,
  ) {}

  ngOnInit(): void {
    this.validateFormEditFeature = this.fb.group({
      isOrderEditingEnabled: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }
}
