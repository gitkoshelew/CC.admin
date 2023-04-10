import { Injectable } from '@angular/core';
import {
  CreateFeatureFlagModelInterface,
  EditFeatureFlagModelInterface,
  FeatureFlagsInterface,
} from '../types/feature-flags.interface';
import { BehaviorSubject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FeatureFlagService {
  public featureFlagsData$: BehaviorSubject<FeatureFlagsInterface[]> =
    new BehaviorSubject<FeatureFlagsInterface[]>([]);

  constructor(private http: HttpClient) {}

  public getAllFeatures(): void {
    this.http
      .get<FeatureFlagsInterface[]>('http://localhost:5000/api/feature-admin')
      .subscribe((res) => this.featureFlagsData$.next(res));
  }
  public getFeatureById(id: number): void {
    this.http.get(`http://localhost:5000/api/feature-admin/${id}`);
  }
  public deleteFeature(id: number): void {
    this.http
      .delete(`http://localhost:5000/api/feature-admin/${id}`)
      .pipe(
        map(() =>
          this.featureFlagsData$
            .getValue()
            .filter((feature) => feature.id !== id),
        ),
      )
      .subscribe((res) => this.featureFlagsData$.next(res));
  }
  public updateFeature(id: number, model: EditFeatureFlagModelInterface): void {
    const feature: FeatureFlagsInterface = this.featureFlagsData$
      .getValue()
      .find((feature) => feature.id === id)!;
    const newModel: EditFeatureFlagModelInterface = { ...feature, ...model };
    Reflect.deleteProperty(newModel, 'createdAt');
    Reflect.deleteProperty(newModel, 'updatedAt');
    Reflect.deleteProperty(newModel, 'id');
    this.http
      .put<FeatureFlagsInterface>(
        `http://localhost:5000/api/feature-admin/${id}`,
        newModel,
      )
      .pipe(
        map((res) =>
          this.featureFlagsData$
            .getValue()
            .map((feature) => (feature.id === id ? res : feature)),
        ),
      )
      .subscribe((res) => this.featureFlagsData$.next(res));
  }
  public createFeature(model: CreateFeatureFlagModelInterface): void {
    this.http
      .post<FeatureFlagsInterface>(
        'http://localhost:5000/api/feature-admin',
        model,
      )
      .pipe(map((res) => [...this.featureFlagsData$.getValue(), res]))
      .subscribe((res) => this.featureFlagsData$.next(res));
  }
}
