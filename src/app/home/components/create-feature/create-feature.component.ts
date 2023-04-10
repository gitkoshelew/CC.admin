import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { FeatureFlagService } from '../../services/feature-flag.service';
import { ModalService } from '../../../shared/modules/modal/modal.service';

@Component({
  selector: 'app-create-feature',
  templateUrl: './create-feature.component.html',
  styleUrls: ['./create-feature.component.scss'],
})
export class CreateFeatureComponent implements OnInit {
  @Output() public isOpen: EventEmitter<boolean> = new EventEmitter<boolean>(
    true,
  );

  public validateForm!: UntypedFormGroup;

  submitForm(): void {
    if (this.validateForm.valid) {
      this.featureFlagService.createFeature(this.validateForm.value);
      this.modalService.close();
      this.isOpen.emit(false);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(
    private fb: UntypedFormBuilder,
    private featureFlagService: FeatureFlagService,
    private modalService: ModalService,
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      isOrderEditingEnabled: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }
}
