import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';
import { TestInterface, TestsService } from '../../services/tests.service';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss'],
})
export class TestsComponent implements OnInit, OnDestroy {
  id?: number;
  title = '';
  autoUnsub: Subject<boolean> = new Subject();
  tests: TestInterface[] = [];
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
  getTests() {
    this.testsService.getTests().subscribe({
      next: (res: TestInterface[]) => {
        this.tests = res;
      },
    });
  }
  setCategoryTitle(): void {
    this.title = this.activatedRoute.snapshot.params['title'];
    this.id = Number(this.activatedRoute.snapshot.params['id']);
    console.log(this.id);
  }
  ngOnDestroy(): void {
    this.autoUnsub.next(false);
    this.autoUnsub.complete();
  }
}
