import { QuestionInterface } from './question.interface';

export interface TestInterface {
  id: number;
  titleTest: string;
  questions: QuestionInterface[];
}
