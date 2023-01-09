import { Component, OnDestroy, OnInit } from '@angular/core';
import { TestInterface } from '../category/category.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss'],
})
export class TestsComponent implements OnInit, OnDestroy {
  id?: number;
  title = '';
  autoUnsub: Subject<boolean> = new Subject();
  tests: TestInterface[] = [
    {
      id: 1,
      titleCategory: this.title,
      titleTest: 'test1',
      questions: [
        {
          question: 'question1',
          answers: ['answer1', 'answer2', 'answer3', 'answer4'],
        },
        {
          question: 'question2',
          answers: ['answer1', 'answer2', 'answer3', 'answer4'],
        },
        {
          question: 'question3',
          answers: ['answer1', 'answer2', 'answer3', 'answer4'],
        },
      ],
    },
    {
      id: 2,
      titleCategory: this.title,
      titleTest: 'test2',
      questions: [
        {
          question: 'question1',
          answers: ['answer1', 'answer2', 'answer3', 'answer4'],
        },
        {
          question: 'question2',
          answers: ['answer1', 'answer2', 'answer3', 'answer4'],
        },
        {
          question: 'question3',
          answers: ['answer1', 'answer2', 'answer3', 'answer4'],
        },
      ],
    },
    {
      id: 3,
      titleCategory: this.title,
      titleTest: 'test3',
      questions: [
        {
          question: 'question1',
          answers: ['answer1', 'answer2', 'answer3', 'answer4'],
        },
        {
          question: 'question2',
          answers: ['answer1', 'answer2', 'answer3', 'answer4'],
        },
        {
          question: 'question3',
          answers: ['answer1', 'answer2', 'answer3', 'answer4'],
        },
      ],
    },
  ];
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
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
    this.id = Number(this.activatedRoute.snapshot.params['id']);
    console.log(this.id);
  }
  ngOnDestroy(): void {
    this.autoUnsub.next(false);
    this.autoUnsub.complete();
  }
}
