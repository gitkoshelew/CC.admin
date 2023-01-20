import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface TestInterface {
  id: number;
  titleTest: string;
  questions: QuestionInterface[];
}

interface QuestionInterface {
  question: string;
  answers: string[];
}

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
}
