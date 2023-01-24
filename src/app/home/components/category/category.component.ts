import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {filter, Observable, Subject, takeUntil} from 'rxjs';
import { TestsService } from '../../services/tests.service';
import { TestInterface } from '../../types/test.interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, OnDestroy {
  title = '';
  autoUnsub: Subject<boolean> = new Subject();
  tests: Observable<TestInterface[]> | null = null;
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly testsService: TestsService,
  ) {}

  ngOnInit(): void {
    this.getTests();
    this.setCategoryTitle();
    this.router.events
      .pipe(
        takeUntil(this.autoUnsub),
        filter((event) => event instanceof NavigationEnd),
      )
      .subscribe(() => {
        this.setCategoryTitle();
      });
  }

  setCategoryTitle(): void {
    this.title = this.activatedRoute.snapshot.params['title'];
  }
  getTests() {
    this.tests =  this.testsService.getTests()
  }
  navigateToTests(id: number) {
    this.router.navigate([`categories/${this.title}/tests/${id}`]);
  }
  navigateToAddTest(): void {
    this.router.navigate([`categories/${this.title}/create-test`]);
  }
  ngOnDestroy(): void {
    this.autoUnsub.next(false);
    this.autoUnsub.complete();
  }
}
