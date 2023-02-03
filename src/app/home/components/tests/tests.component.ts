import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { TestsService } from '../../services/tests.service';
import { QuestionInterface } from '../../types/question.interface';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss'],
})
export class TestsComponent implements OnInit, OnDestroy {
  id!: number;
  topicId!: number;
  title = '';
  autoUnsub: Subject<boolean> = new Subject();
  questions!: Observable<QuestionInterface[] | null>;
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly testsService: TestsService,
  ) {}

  ngOnInit(): void {
    this.setParams();
    this.router.events
      .pipe(
        takeUntil(this.autoUnsub),
        filter((event) => event instanceof NavigationEnd),
      )
      .subscribe(() => {
        this.setParams();
      });
    this.getQuestions(this.topicId);
  }

  getQuestions(topicId: number) {
    this.questions = this.testsService.getQuestions(topicId);
  }

  setParams(): void {
    this.title = this.activatedRoute.snapshot.params['title'];
    this.id = Number(this.activatedRoute.snapshot.params['id']);
    this.topicId = Number(this.activatedRoute.snapshot.params['topicId']);
  }
  ngOnDestroy(): void {
    this.autoUnsub.next(false);
    this.autoUnsub.complete();
  }
}
