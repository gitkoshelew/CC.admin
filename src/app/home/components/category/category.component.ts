import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { TestsService } from '../../services/tests.service';
import { QuizInterface } from '../../types/quiz.interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, OnDestroy {
  title = '';
  topicId!: number;
  autoUnsub: Subject<boolean> = new Subject();
  tests: Observable<QuizInterface[]> | null = null;
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly testsService: TestsService,
  ) {}

  ngOnInit(): void {
    this.setTopicTitle();
    this.setTopicId();
    this.getTests(this.title);
    this.router.events
      .pipe(
        takeUntil(this.autoUnsub),
        filter((event) => event instanceof NavigationEnd),
      )
      .subscribe(() => {
        this.setTopicTitle();
      });
  }

  setTopicTitle(): void {
    this.title = this.activatedRoute.snapshot.params['title'];
  }
  setTopicId(): void {
    this.topicId = this.activatedRoute.snapshot.params['topicId'];
  }

  getTests(title: string) {
    this.tests = this.testsService.getTests(title);
  }
  navigateToTests(id: number) {
    this.router.navigate([`topics/${this.title}/${this.topicId}/tests/${id}`]);
  }
  navigateToAddTest(): void {
    this.router.navigate([`topics/${this.title}/${this.topicId}/create-test`]);
  }
  ngOnDestroy(): void {
    this.autoUnsub.next(false);
    this.autoUnsub.complete();
  }
}
