import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FeatureFlagsInterface } from '../../types/feature-flags.interface';
import { ModalService } from '../../../shared/modules/modal/modal.service';
import { FeatureFlagService } from '../../services/feature-flag.service';

@Component({
  selector: 'app-feature-flags',
  templateUrl: './feature-flags.component.html',
  styleUrls: ['./feature-flags.component.scss'],
})
export class FeatureFlagsComponent implements OnInit {
  public featureFlagsData$!: Observable<FeatureFlagsInterface[]>;
  public isShowModalWindow$!: Observable<boolean>;
  public isCreateFeature!: boolean;
  public isDeleteFeature!: boolean;
  public isEditFeature!: boolean;
  public currentID!: number;
  public currentTitle!: string;
  public currentDescription!: string;

  constructor(
    private featureService: FeatureFlagService,
    private modalService: ModalService,
  ) {}

  public ngOnInit(): void {
    this.featureFlagsData$ = this.featureService.featureFlagsData$;
    this.isShowModalWindow$ = this.modalService.isVisible$;
    this.featureService.getAllFeatures();
  }

  public openModalCreateFeature(): void {
    this.modalService.open();
    this.isCreateFeature = true;
  }
  public openModalDeleteFeature(id: number): void {
    this.modalService.open();
    this.isDeleteFeature = true;
    this.currentID = id;
  }
  public openModalEditFeature(
    id: number,
    title: string,
    description: string,
  ): void {
    this.modalService.open();
    this.isEditFeature = true;
    this.currentID = id;
    this.currentTitle = title;
    this.currentDescription = description;
  }
  public changeIsCreateFeature(isOpen: boolean): void {
    this.isCreateFeature = isOpen;
  }
  public changeIsDeleteFeature(isOpen: boolean): void {
    this.isDeleteFeature = isOpen;
  }
  public changeIsEditFeature(isOpen: boolean): void {
    this.isEditFeature = isOpen;
  }
  public changeAdminStatus(id: number, isDone: boolean): void {
    console.log(this.featureService.featureFlagsData$.getValue());
    this.featureService.updateFeature(id, { adminPortalFeatureStatus: isDone });
  }
  public changeDesktopStatus(id: number, isDone: boolean): void {
    this.featureService.updateFeature(id, { userPortalFeatureStatus: isDone });
  }
  public changeMobileStatus(id: number, isDone: boolean): void {
    this.featureService.updateFeature(id, {
      mobilePortalFeatureStatus: isDone,
    });
  }
}
