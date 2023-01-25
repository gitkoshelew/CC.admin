import { Injectable } from '@angular/core';
import { filter, map, Observable, of } from 'rxjs';
import { TestInterface } from '../types/test.interface';
import {QuestionInterface} from "../types/question.interface";

@Injectable({
  providedIn: 'root',
})
export class TestsService {
  tests$: TestInterface[] = [
    {
      id: 1,
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
  getTests(): Observable<TestInterface[]> {
    return of(this.tests$);
  }
  getQuestions(categoryId: number): Observable<QuestionInterface[] | undefined> {
    return of(this.tests$).pipe(
      map((tests) => tests.find((test) => test.id === categoryId)?.questions),
    );
  }
}
