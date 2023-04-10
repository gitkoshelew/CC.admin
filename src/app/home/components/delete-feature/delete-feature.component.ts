import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FeatureFlagService } from '../../services/feature-flag.service';

@Component({
  selector: 'app-delete-feature',
  templateUrl: './delete-feature.component.html',
  styleUrls: ['./delete-feature.component.scss'],
})
export class DeleteFeatureComponent {
  @Input() public id!: number;
  @Output() public isOpen: EventEmitter<boolean> = new EventEmitter<boolean>(
    true,
  );

  constructor(private featureService: FeatureFlagService) {}

  public deleteFeature(): void {
    this.featureService.deleteFeature(this.id);
    this.isOpen.emit(false);
  }
  public closeDeleteFeature(): void {
    this.isOpen.emit(false);
  }
}
