import {Component, OnInit} from '@angular/core';
import {QuestionInterface} from "../../types/question.interface";
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";

type QuestionDataType = {
  questionId: string;
  isCompleted: boolean;
};
type QuestionType = 'single' | 'multi';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss'],
})
export class CreateTestComponent implements OnInit{
  validateForm!: UntypedFormGroup;
  question!: QuestionInterface;
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
  questionType!: QuestionType;
  constructor(private fb: UntypedFormBuilder) {}
  getQuestionType(value: QuestionType){
    this.questionType = value
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({});
  }
}
