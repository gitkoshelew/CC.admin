import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ModalService } from 'src/app/shared/modules/modal/modal.service';
import { TestsService } from '../../services/tests.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent implements OnInit {
  validateForm!: UntypedFormGroup;

  submitForm(): void {
    if (this.validateForm.valid) {
      this.testsService
        .createNewCategory(this.validateForm.value.newCategory)
        .subscribe(() => this.modalService.close());
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
    private testsService: TestsService,
    private modalService: ModalService,
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      newCategory: [null, [Validators.required]],
    });
  }
}
