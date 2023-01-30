import { Component } from '@angular/core';

type ComplexityType = 'Easy' | 'Medium' | 'Hard';
type QuestionsNumberType = '10' | '15' | '20' | '25' | '30';
type QuestionDataType = {
  questionId: string;
  isCompleted: boolean;
};
type QuestionType = 'Single-Choice' | 'Multi-Choice';
type TimerDefaultType = {
  minutes: string;
  seconds: string;
};

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss'],
})
export class CreateTestComponent {
  selectedCategory = null;
  selectedQuestionType: QuestionType = 'Single-Choice';
  isAnswer1 = false;
  isAnswer2 = false;
  categories = [
    'JavaScript',
    'Node.js',
    'React',
    'Angular',
    'React Native',
    'Python',
    'Java',
    'C++',
    'SQL',
    'HTML',
    'Css',
  ];
  questionTypeData: QuestionType[] = ['Single-Choice', 'Multi-Choice'];
  complexity: ComplexityType = 'Medium';
  questionsNumber: QuestionsNumberType = '10';
  questionsData: QuestionDataType[] = [
    {
      questionId: '1',
      isCompleted: true,
    },
    {
      questionId: '2',
      isCompleted: true,
    },
    {
      questionId: '3',
      isCompleted: true,
    },
    {
      questionId: '4',
      isCompleted: false,
    },
    {
      questionId: '5',
      isCompleted: false,
    },
    {
      questionId: '6',
      isCompleted: false,
    },
    {
      questionId: '7',
      isCompleted: false,
    },
    {
      questionId: '8',
      isCompleted: false,
    },
    {
      questionId: '9',
      isCompleted: false,
    },
    {
      questionId: '10',
      isCompleted: false,
    },
  ];
  timer: TimerDefaultType = {
    minutes: '5',
    seconds: '00',
  };
}
