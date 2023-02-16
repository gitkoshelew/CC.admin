import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import {
  UntypedFormGroup,
  Validators,
  AbstractControl,
  FormBuilder,
  FormArray
} from '@angular/forms';

interface ContentInterface {
  options: Array<AnswerInterface>;
  correctAnswer: Array<string>;
}
interface AnswerInterface {
  id: number;
  title: string;
  isCorrectAnswer: boolean;
}
type QuestionType = 'single' | 'multi';

@Component({
  selector: 'app-answer-block',
  templateUrl: './answer-block.component.html',
  styleUrls: ['./answer-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnswerBlockComponent implements OnChanges {
  @Input() questionTypeProps!: QuestionType;
  @Input() validateFormProps!: UntypedFormGroup[];
  @Output() answersEvent = new EventEmitter<ContentInterface>();

  constructor(
    private readonly fb: FormBuilder,
  ) {}
  addAnswer(e: MouseEvent): void {
    e.preventDefault();
    this.validateFormProps?.push(
      this.fb.group({
        title: ['', [Validators.required]],
        isCorrectAnswer: [false],
      })
    );
  }

  removeAnswer(index: number): void {
    this.validateFormProps.splice(index, 1);
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['questionTypeProps']) {
      this.validateFormProps.forEach((control: AbstractControl) => {
        control.get('isCorrectAnswer')?.setValue(false)
      })
    }
  }
}
