import {Injectable} from '@angular/core';
import {map, Observable, of} from 'rxjs';
import {QuizInterface} from '../types/quiz.interface';
import {QuestionInterface} from '../types/question.interface';
import {CategoryInterface} from "../types/category.interface";

@Injectable({
  providedIn: 'root',
})
export class TestsService {
  tests$: QuizInterface[] = [
    {
      id: 1,
      title: 'NodeJS',
      authorID: 1
    },
    {
      id: 2,
      title: 'NodeJS',
      authorID: 1
    },
    {
      id: 3,
      title: 'NodeJS',
      authorID: 1
    },
    {
      id: 4,
      title: 'JavaScript',
      authorID: 1
    },
    {
      id: 5,
      title: 'JavaScript',
      authorID: 1
    },
    {
      id: 6,
      title: 'JavaScript',
      authorID: 1
    },
  ]
  questions$: QuestionInterface[] = [
    {
    id: 1,
    title: "Node JS question #1",
    content: {
      options: ['answer1', 'answer2', 'answer3', 'answer4'],
      correctAnswer: ['answer1']
    },
    type: "single",
    difficulty: "light",
    description: "that test will show us ur power in Node js",
    timer: 500,
    topicId: 1,
    moderationId: 1
  },
    {
      id: 2,
      title: "Node JS question #2",
      content: {
        options: ['answer1', 'answer2', 'answer3', 'answer4'],
        correctAnswer: ['answer1']
      },
      type: "single",
      difficulty: "light",
      description: "that test will show us ur power in Node js",
      timer: 500,
      topicId: 1,
      moderationId: 2
    },
    {
      id: 3,
      title: "Node JS question #3",
      content: {
        options: ['answer1', 'answer2', 'answer3', 'answer4'],
        correctAnswer: ['answer1']
      },
      type: "single",
      difficulty: "light",
      description: "that test will show us ur power in Node js",
      timer: 500,
      topicId: 1,
      moderationId: 3
    },
    {
      id:4,
      title: "JavaScript question #1",
      content: {
        options: ['answer1', 'answer2', 'answer3', 'answer4'],
        correctAnswer: ['answer1']
      },
      type: "single",
      difficulty: "light",
      description: "that test will show us ur power in Node js",
      timer: 500,
      topicId: 2,
      moderationId: 4
    },
    {
      id: 5,
      title: "JavaScript question #2",
      content: {
        options: ['answer1', 'answer2', 'answer3', 'answer4'],
        correctAnswer: ['answer1']
      },
      type: "single",
      difficulty: "light",
      description: "that test will show us ur power in JS",
      timer: 500,
      topicId: 2,
      moderationId: 5
    },
    {
      id:4,
      title: "JavaScript question #3",
      content: {
        options: ['answer1', 'answer2', 'answer3', 'answer4'],
        correctAnswer: ['answer1']
      },
      type: "single",
      difficulty: "light",
      description: "that test will show us ur power in JS",
      timer: 500,
      topicId: 2,
      moderationId: 6
    },
  ]
  categories$: CategoryInterface[] = [
    {id: 1, title:'NodeJS'},
    {id: 2, title:'JavaScript'},
    {id: 3, title:'React'},
    {id: 4, title: 'Angular'},
    {id: 5, title:'React Native'},
    {id: 6, title:'Python'},
    {id: 7, title: 'Java'},
    {id: 8, title:  'C++'},
    {id: 9, title:  'SQL'},
    {id: 10, title:  'HTML'},
    {id: 11, title:  'CSS'}
  ];

  getTests(title: string): Observable<QuizInterface[]> {
    return of(this.tests$).pipe(map((tests) => tests.filter((test) => test.title.toUpperCase() === title.toUpperCase())));}

  getQuestions(topicId: number): Observable<QuestionInterface[]> {
    return of(this.questions$).pipe(
      map((questions) => questions.filter((question) => question.topicId === topicId)),
    );
  }
  getCategories(): Observable<CategoryInterface[]>{
    return of(this.categories$)
  }
}
